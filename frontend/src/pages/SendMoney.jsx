import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {Button} from '../components/Button'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Gbutton } from '../components/Gbutton'
import axios from 'axios'

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name")
  const [amount,setAmount] = useState(0);

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-96 text-center p-6 h-max shadow-lg">
        <Heading label={"Send Money"}/>
        <div className="flex items-center mt-8 mb-6">
          <div className="rounded-full h-12 w-12 bg-green-500 flex justify-center items-center mr-4">
            <div className="text-2xl text-white">
              {name[0].toUpperCase()}
            </div>
          </div>
          <div className="text-2xl font-semibold">
            {name}
          </div>
        </div>

        <InputBox onChange={(e)=>{
          setAmount(e.target.value)
        }} label={"Amount (in ₹)"} placeholder={"Enter the amount"}/>
        <div className="pt-2">
          <Gbutton onClick={()=>{
            axios.post("http://localhost:3000/api/v1/account/transfer",{
              to: id,
              amount:amount
            },{
              headers:{
                Authorization:"Bearer " + localStorage.getItem("token")
              }
            })
            }
          }
            label={"Initiate Transfer"}
          />
        </div>
      </div>
    </div>
  </div>
}
