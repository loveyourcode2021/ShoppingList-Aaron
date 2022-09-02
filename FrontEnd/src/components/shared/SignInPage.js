import React, { useEffect, useState } from "react";
import Navigation from "../NavBar";
import { User } from "../../requests"
import { useNavigate } from "react-router-dom";

export const SignInPage = ({ onSignIn }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();



    useEffect(() => { console.log("SignInPuage") })
    function handleSubmit(event) {
        event.preventDefault();

        const params = {
            email: email,
            password: password
        }

        User.signin(params)
            .then(data => {

                if (data?.user) {
                    onSignIn(params)
                    navigate("/")
                }
            })
    }
    return (

            <div class="container">
                <div class="card">
                <h1 class="card_title">Login to your account</h1>
               
                </div>
        
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={event => {
                            setEmail(event.currentTarget.value)
                        }} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={event => {
                            setPassword(event.currentTarget.value)
                        }} />
                    </div>
                    <input type="submit" value="Sign In" />
                </form>
            </div>

    )


}