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
        <main>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                {/* {errors.length > 0 ? (
                    <div>
                        <h4>Failed to Sign In</h4>
                        <p>{errors.map(error => error.message).join(", ")}</p>
                    </div>
                ) : (
                    ""
                )} */}

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
        </main>
    )


}