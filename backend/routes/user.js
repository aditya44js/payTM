//here both validation and and route for post and put for users

const express = require('express');
const z = require('zod');
const router =  express.Router();
const {User, Account} = require ('../db');
const {authmiddleware} = require('../middleware');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

const signupBody = z.object({
    username:z.string().email(),
    password:z.string(),
    firstName:z.string(),
    lastName:z.string()
})

router.post("/signup",async(req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Email already taken / Incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message:"Email already taken / Incorrect Inputs"
        })
    }
    

    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

        const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    
    const token = jwt.sign({
        userId
    },JWT_SECRET);
    
    res.json({
        message:"User created successfully",
        token:token
    })
})

const signinBody = z.object({
    username:z.string().email(),
    password:z.string(),
})

router.post("/signin",async(req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Email already taken / Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.json({
        token: token
    });
})

const updateBody = z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
})

router.put("/",authmiddleware,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message:"Error while updating information"
        })
    }

    await User.updateOne(
    {
        _id: req.userId
    },
    req.body
)

    res.json({
        message:"Update successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;
