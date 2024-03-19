import { useState } from "react";
import axios from "axios";
import "./Signup.css";
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
        <div className="signUp-page">
            <div className="formBlock form">
                <Heading title="Sign up" />
                <Input inputTitle="First Name" stateUpdater={setFirstName} />
                <Input inputTitle="Last Name" stateUpdater={setLastName} />
                <Input inputTitle="Email" stateUpdater={setEmail} />
                <Input inputTitle="Password" stateUpdater={setPass} />
                <div className="submitButton">
                    <Button buttonName="Sign up" click={async() => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            userName: email,
                            firstName: firstname,
                            lastName: lastname,
                            password: pass,
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }} />
                    <p>
                        Already have an account? <a href="http://localhost:5173/signin">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
