import Qr from './assets/qr.svg'
import Bank from './assets/bank.svg'
import History from './assets/history.svg'
import Rupee from './assets/rupee.svg'

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Features = () => {
    const navigate = useNavigate();
    return <div className="flex justify-around mt-10">
        <div>
            <button className="p-5 rounded-3xl bg-slate-900">
                <img src={Qr} alt="" />
            </button>
            <div className="text-center pt-2">
                <p>Scan & Pay</p>
            </div>
        </div>
        <div>
            <button className="p-5 rounded-3xl bg-slate-900">
                <img src={Bank} alt="" />
            </button>
            <div className="text-center pt-2">
                <p>To Bank</p>
            </div>
        </div>
        <div>
            <button className=" p-5 rounded-3xl bg-slate-900" onClick={() => {navigate('/history')}}>
                <img src={History} alt="" />
            </button>
            <div className="text-center text-pretty pt-2">
                <p className="max-w-[75px]">Balance & History</p>
            </div>
        </div>
        <div>
            {/* <button className="p-5 rounded-3xl bg-slate-900">
                <img src={Rupee} alt="" />
            </button> */}
            <DrawerButton />
            <div className="text-center break- pt-2">
                <p>Add Money</p>
            </div>
        </div>
    </div>
}

function DrawerButton() {
    const [amount, setAmount] = useState(100)
    function onClick(adjustment) {
        setAmount(Math.max(10, Math.min(10000, amount + adjustment)))
    }

    function addAmount(){
        axios.post('https://paytmbackend.rohitchauhan.site/api/v1/account/addBalance',{
            amount: amount
        },{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log(response)
            window.location.reload(false);
        })

        // axios.post('https://paytmbackend.rohitchauhan.site/api/v1/account/history', {
        //     amount: amount,
        // },{
        //     headers: {
        //         Authorization: "Bearer "+ localStorage.getItem("token")
        //     }
        // }).then(response => {
        //     console.log(response)
        // })
    }

    return <Drawer>
        <DrawerTrigger asChild>
            <button className="p-5 rounded-3xl bg-slate-900">
                <img src={Rupee} alt="" />
            </button>
        </DrawerTrigger>
        <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>Amount</DrawerTitle>
                    {/* <DrawerDescription>Set your daily activity amount.</DrawerDescription> */}
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <div className="flex items-center justify-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(-10)}
                            disabled={amount <= 10}
                        >
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="flex-1 text-center">
                            <div className="text-7xl font-bold tracking-tighter">
                                {amount}
                            </div>
                            <div className="text-[0.70rem] uppercase text-muted-foreground">
                                Rupees
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(10)}
                            disabled={amount >= 10000}
                        >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Increase</span>
                        </Button>
                    </div>
                    <div className="mt-3 h-[120px]">

                    </div>
                </div>
                <DrawerFooter>
                    <Button onClick={addAmount}>Add Money</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </div>
        </DrawerContent>
    </Drawer>
}