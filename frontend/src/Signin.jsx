import { useState } from "react";
import Heading from "./components/Heading";
import Input from "./components/Input";
import Button from "./components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4/5 rounded-xl shadow-2xl shadow-black-500/50  md:w-1/2 xl:w-1/4">
                <Heading title="Signin" />
                <Input inputTitle="Email" stateUpdater={setEmail} />
                <Input inputTitle="Password" stateUpdater={setPass} />
                <div className="text-center">
                    <Button buttonName="Sign in" click={async () => {
                        const response = await axios.post("https://paytmbackend.rohitchauhan.site/api/v1/user/signin", {
                            userName: email,
                            password: password
                        })
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }} />
                    <p className="m-3">
                        Don&apos;t have an account? <a href="https://paytmbackend.rohitchauhan.site/signup">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signin;
