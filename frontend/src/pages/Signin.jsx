import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/Inputbox";
import { SubHeading } from "../components/Subheading";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Importing axios to resolve the axios not defined error

export const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Adding state to store and display errors

    const handleSignin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token); // Store the token
                console.log(response.data.token);
                navigate("/dashboard"); // Redirect to dashboard after successful signin
            } else {
                throw new Error("Token is missing in response");
            }
        } catch (err) {
            console.error("Error during signin:", err);
            setError(err.response?.data?.message || "Signin failed. Please try again."); // Set error message
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    
                    {/* Input field for Email */}
                    <InputBox placeholder="loh777@gmail.com" label={"Email"} onChange={(e) => setUsername(e.target.value)} />
                    
                    {/* Input field for Password */}
                    <InputBox placeholder="blackwidow" label={"Password"} onChange={(e) => setPassword(e.target.value)} />
                    
                    {/* Error Message Display */}
                    {error && <div className="text-red-500 text-sm">{error}</div>} {/* Adding error display */}
                    
                    <div className="pt-4">
                        <Button label={"Sign in"} onClick={handleSignin} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
                </div>
            </div>
        </div>
    );
};
