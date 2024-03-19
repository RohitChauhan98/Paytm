import { useEffect, useState } from "react";
import Heading from "./components/Heading";
import Input from "./components/Input";
import "./Dashboard.css"
import axios from "axios";
import SearchFeed from "./components/SearchFeed";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [balance, setBalance] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user);
            })

    }, [filter]);

    useEffect(() => {
        axios.post("http://localhost:3000/api/v1/user/me", {
            token: localStorage.getItem("token")
        })
            .then(response => {
                setName(response.data.name);
                setId(response.data.id);
                axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers: {
                        Authorization: "Bearer "+ localStorage.getItem("token")
                    }
                })
                    .then(response => {
                        setBalance(response.data.balance);
                    })
            })


    }, [])



    return (
        <div>
            <div className="nav">
                <Heading title="PayTM" size="mid" />
                <div>
                    <Heading title={"Hello, " + name} size="mid" />
                </div>
            </div>
            <hr />
            <div className="userInfo">
                <div className="userBalance">
                    <Heading title="Your Balance: " size="mid" />
                    <h3>Rs {Math.trunc(balance)}</h3>
                </div>
                <Input inputTitle="User" stateUpdater={setFilter} />
                {users.map((user) => <SearchFeed key={user._id} firstName={user.firstName} lastName={user.lastName} click={() => {
                    navigate("/sendmoney?id=" + user._id + "&name=" + user.firstName);
                }} />)}
            </div>

        </div>
    )
}


export default Dashboard;