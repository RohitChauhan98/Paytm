import axios from "axios"
import { useEffect, useState } from "react"
import { Header } from "./components/Header";


export const History = () => {
    const [history, setHistory] = useState([])
    const [username, setUsername] = useState("");

    useEffect(() => {
        axios.post("https://paytmbackend.rohitchauhan.site/api/v1/user/me", {
            token: localStorage.getItem("token")
        }).then(response => {
            setUsername(response.data.name);
        })
    }, [])

    useEffect(() => {
        axios.get('https://paytmbackend.rohitchauhan.site/api/v1/account/getHistory',{
            headers: {
                Authorization: "Bearer "+ localStorage.getItem("token")
            }
        }).then(response => {
            setHistory(response.data.transaction)
        })
    }, [])

    console.log(history)
    return <div>
        {username && <Header name={username}/>}
    <div className="m-8">
        <div>
            <button type="button" className="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none  focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 me-2 mb-2">
                All
            </button>
            <button type="button" className="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none  focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 me-2 mb-2">
                Paid
            </button>
            <button type="button" className="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none  focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-2.5 me-2 mb-2">
                Recieved
            </button>
        </div>
        {history.map((h) => <div className="py-5 border-b border-slate-400" key={h._id}>
            <div className="flex justify-between text-lg font-bold">
                <div>
                    {h.transactionType === "debit" ? `Money sent to: ${h.to}` : `Recieved From: ${h.from}`}
                </div>
                <div>
                    {h.transactionType === "debit"? `-₹ ${h.amount}` : `+₹ ${h.amount}`}
                </div>
            </div>
            <div className="text-slate-600 font-bold">{new Date(h.createdAt).toUTCString()}</div>
        </div>)}
        </div>
    </div>
}