import { useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import tune from "./assets/sounds/payment_tune.mp3"

function SendMoney() {
    const [amount, setAmount] = useState(null);
    const [description, setDescription] = useState("")
    const hiddenElementRef = useRef(null);
    const [characterWidth, setCharacterWidth] = useState(null);

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
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
        if (!hiddenElementRef.current) return;

        const getCharacterWidth = (character) => {
            const hiddenElement = hiddenElementRef.current;
            hiddenElement.textContent = character;
            const width = hiddenElement.offsetWidth;
            return width;
        };

        const character = description; // Or any character you want to measure
        const width = getCharacterWidth(character);
        setCharacterWidth(width);
    }, [description]);

    function sendMoney() {
        axios.post("https://paytmbackend.rohitchauhan.site/api/v1/account/transfer", {
            to: id,
            amount: amount
        },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                console.log(response)

            })

        axios.post('https://paytmbackend.rohitchauhan.site/api/v1/account/history', {
            amount: amount,
            to: id,
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response)
        })



        var sound = new Audio(tune);
        sound.play();

        setTimeout(() => { 
            navigate("/dashboard"); 
            window.location.reload(false) 
        }, 3500)
    }

    return (
        <div>
            {username && <Header name={username} />}
            <div className="flex justify-center flex-col  m-10">
                <div className="m-auto">

                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{name[0]}</Avatar>
                </div>
                <div className="m-auto text-xl mb-5">
                    <h2>Paying {name}</h2>
                </div>
                <div className="m-auto flex text-4xl">
                    <h1>₹</h1>
                    <input style={{ width: `${amount === null ? 20 : amount.toString().length * 20}px` }} className="ml-2 appearance-none outline-none focus:border-transparent" type="number" placeholder="0" onChange={(e) => {
                        setAmount(e.target.value);
                    }} />
                </div>
                <div className="m-auto my-5">
                    <input style={{ width: `${description === "" ? 120 : characterWidth}px` }} className="outline-none focus:border-transparent" type="text" spellCheck="false" placeholder="Add Description" onChange={(e) => {
                        setDescription(e.target.value);
                    }} />
                </div>
                <div className="m-auto my-10">
                    <Button variant="contained" className="w-40 flex" color="success" onClick={sendMoney}>
                        Pay
                    </Button>

                </div>
                <div className="border-2 m-auto opacity-0" ref={hiddenElementRef}>
                    {description}
                </div>
            </div>

        </div>
    );
}

export default SendMoney;