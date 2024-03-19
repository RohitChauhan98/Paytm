import { useState } from "react";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SendMoney.css"

function SendMoney(props) {
    const [amount, setAmount] = useState(0);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const navigate = useNavigate();

    return (
        <div className="payUser">
            <div><h2>You are Paying</h2></div>
            <div className="reciever">
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{name[0]}</Avatar>
                <h2>{name}</h2>
            </div>
            <div className="amount">
                    <h1>₹</h1>
                    <input className="amountInput" type="number" placeholder="0" onChange={(e) => {
                        setAmount(e.target.value);
                    }} />
            </div>

            <input className="description" type="text" spellCheck="false" placeholder="Add Description" />
            <Button variant="contained" className="payBtn" color="success" onClick={() => {
                axios.post("http://localhost:3000/api/v1/account/transfer", {
                    to: id,
                    amount: amount
                },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                navigate("/dashboard");
            }}>
                Pay
            </Button>
        </div>
    );
}

export default SendMoney;