// this file handles 
// checking account balance & Transfering money 

const express = require('express');
const {authmiddleware} = require('../middleware');

const {Account} = require('../db');

const {default:mongoose} = require('mongoose');

const router = express.Router();

router.get("/balance",authmiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance:account.balance
    })
});

router.post("/transfer",authmiddleware,async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount,to} = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.json({
            message: "Insufficant balance"
        })
    }

    const toAccount = await Account.findOne({
        userId:to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.json({
            message: "Invaild Account"
        })
    }

    // Perform the transfer

    await Account.updateOne({
        userId: req.userId
    },{
        $inc:{
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    },{
        $inc:{
            balance: amount
        }
    }).session(session);


    await session.commitTransaction();
    session.endSession();
    res.json({
        message:"Transfer successful"
    });
});

module.exports = router;