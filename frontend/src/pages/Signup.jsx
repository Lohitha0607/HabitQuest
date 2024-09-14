import React, { useState } from 'react';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/Subheading';
import { Button } from '../components/Button';
import { InputBox } from '../components/Inputbox';
import { BottomWarning } from '../components/BottomWarning';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle error messages

  const handleSignup = async () => {
    // Clear any previous errors
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username,
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log('Response Data:', response.data); // Log response data for debugging

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token stored in localStorage:", localStorage.getItem("token")); // Log stored token
        navigate("/dashboard"); // Redirect to dashboard after successful signup
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error); // Log error details
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          
          <InputBox 
            placeholder="Name" 
            label={"Name"} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <InputBox 
            placeholder="Email" 
            label={"Email"} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <InputBox 
            type="password"
            placeholder="Password" 
            label={"Password"} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error message */}
          <div className="pt-4">
            <Button 
              label={"Sign up"}  
              onClick={handleSignup}
            />
          </div>
          <BottomWarning 
            label={"Already have an account?"} 
            buttonText={"Sign in"} 
            to={"/signin"} 
          />
        </div>
      </div>
    </div>
  );
};
