import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Features } from "./Features";
import { Utilities } from "./Utilities";
import User from "./components/User"

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState("");
    const [balance, setBalance] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        axios.get("https://paytmbackend.rohitchauhan.site/api/v1/user/bulk")
            .then(response => {
                setUsers(response.data.user);
            })
            
    }, []);

    useEffect(() => {
        axios.post("https://paytmbackend.rohitchauhan.site/api/v1/user/me", {
            token: localStorage.getItem("token")
        })
            .then(response => {
                setId(response.data.id);
                axios.get("https://paytmbackend.rohitchauhan.site/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(response => {
                        setBalance(response.data.balance);
                    })
            })


    }, [])



    return (
        <div className="bg-slate-200">
            <div className="md:w-1/2 lg:w-1/3 m-auto" >
                <div className="font-medium ml-5 ">
                    <h3 className="text-5xl">₹ {Math.trunc(balance)}</h3>
                    <p className="text-md text-slate-600 font-light">Available balance</p>
                </div>
                <div>
                    <Features />
                </div>
                <div className="mt-10 mx-2 p-6 rounded-3xl bg-white">
                    <Utilities />
                    <div className="mt-10 pt-5 border-t-2">
                        <p className="text-2xl font-semibold">People</p>
                        <div className="grid grid-cols-4 gap-4 mt-5">
                            {users.map((user) => <User key={user._id} firstName={user.firstName} lastName={user.lastName} click={() => {
                                navigate("/sendmoney?id=" + user._id + "&name=" + user.firstName);
                            }} />)}
                        </div>
                    </div>
                </div>
                
                {/* <div className="flex justify-center">
                    <input className="border-2 rounded-lg text-lg p-1 pl-4 mt-10 mb-5" type="text" placeholder="Search user" onChange={(e)=>{
                        setFilter(e.target.value);
                    }} />
                </div> */}
            </div>

        </div>
    )
}


export default Dashboard;