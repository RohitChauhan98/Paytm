import { useState } from "react";
import axios from "axios";
import Heading from "./components/Heading";
import Input from "./components/Input";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-4/5 rounded-xl shadow-2xl shadow-black-500/50  md:w-1/2 xl:w-1/4">
                <Heading className="text-4xl" title="Sign up" />
                <Input inputTitle="First Name" stateUpdater={setFirstName} />
                <Input inputTitle="Last Name" stateUpdater={setLastName} />
                <Input inputTitle="Email" stateUpdater={setEmail} />
                <Input inputTitle="Password" stateUpdater={setPass} />
                <div className="text-center">
                    <Button buttonName="Sign up" click={async() => {
                        const response = await axios.post("https://paytmbackend.rohitchauhan.site/api/v1/user/signup", {
                            userName: email,
                            firstName: firstname,
                            lastName: lastname,
                            password: pass,
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }} />
                    <p className="m-3">
                        Already have an account? <a href="https://paytm.rohitchauhan.site/signin">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
