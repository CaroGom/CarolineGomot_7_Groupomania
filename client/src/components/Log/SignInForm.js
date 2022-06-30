import React, { useState } from "react";
import axios from 'axios';
    


const SignInForm = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    const user = await fetch("http://localhost:3000/api/auth/");
    const post = await fetch("http://localhost:3000/api/post/");

    console.log(await user.json());
    console.log(await post.json());

    const response = await fetch("http://localhost:3000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log(response);
    console.log(await response.json());
  };

    return (
        <form action="" onSubmit={handleLogin} id="sign-in-form">
            <label htmlFor="email">Email</label>
            <br/>
            <input 
            type="text" 
            name="email" 
            id="email" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}/>
            <br/>
            <div className="email error"></div>
            <label htmlFor="password">Mot de passe</label>
            <br/>
            <input 
            type="password" 
            name="password" 
            id="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>
            <br/>
            <div className="password error"></div>
            <br/>
            <input type = "submit" value="Se connecter"/>
        </form>
    )
}

export default SignInForm;