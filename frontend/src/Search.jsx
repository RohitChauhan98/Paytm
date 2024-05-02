import { useEffect, useState } from "react";
import Send from "./assets/send.svg"
import axios from "axios";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";


export const Search = () => {
    const [filter, setFilter] = useState("");
    const [user, setUser] = useState([])
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        axios.post("https://paytmbackend.rohitchauhan.site/api/v1/user/me", {
            token: localStorage.getItem("token")
        }).then(response => {
            setUsername(response.data.name);
        })
    }, [])

    useEffect(() => {
        axios.get(`https://paytmbackend.rohitchauhan.site/api/v1/user/bulk/?filter=${filter}`)
            .then(response => {
                setUser(response.data.user)
            })
    }, [filter])

    return <div>
        {username && <Header name={username}/>}
        <div className="m-8 flex justify-center">
            <div className="w-full sm:w-4/5 md:w-1/2 lg:w-1/3">
                <form>
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" onChange={(e) => { setFilter(e.target.value) }} autoComplete="false" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600" placeholder="Search" required />
                    </div>
                </form>

                <div className="mt-10">
                    {user.map((u) => <div className="flex justify-between text-black mt-2" key={u.id}>
                        <div className="flex items-center">
                            <Avatar sx={{ bgcolor: deepOrange[500] }} className="">{u.firstName[0]}</Avatar>
                            <div className="ml-4">{u.firstName} {u.lastName}</div>
                        </div>
                        <div className="w-10 h-10" >
                            <img className="" src={Send} alt="" onClick={() => {
                                console.log("/sendmoney?id=" + user._id + "&name=" + user.firstName);
                                navigate("/sendmoney?id=" + u._id + "&name=" + u.firstName)
                            }} />
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </div>
}