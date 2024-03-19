import { useState } from "react";
import Heading from "./components/Heading";
import "./Signup.css";
import Input from "./components/Input";
import Button from "./components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();

    return (
        <div className="signUp-page">
            <div className="formBlock form">
                <Heading title="Signin" />
                <Input inputTitle="Email" stateUpdater={setEmail} />
                <Input inputTitle="Password" stateUpdater={setPass} />
                <div className="submitButton">
                    <Button buttonName="Sign in" click={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            userName: email,
                            password: password
                        })
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }} />
                    <p>
                        Don&apos;t have an account? <a href="http://localhost:5173/signup">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
