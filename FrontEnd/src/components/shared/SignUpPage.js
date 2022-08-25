import React, { useState, useEffect } from "react"
import {User} from "../../requests"
import { useNavigate } from "react-router-dom";
export const SignUpPage = (props) => {
    const { onSignUp } = props;
    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(()=>{console.log("SignUpPage")})
    function handleSubmit(event){
        event.preventDefault();
        const params = {
            email: email,
            password: password
        }
        User.signup(params).then(data => {
            console.log(data)
            onSignUp(data)
            navigate("/")
        })
    }
    return(
    <main>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={event => {
                        setEmail(event.currentTarget.value)}} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={event => {
                        setPassword(event.currentTarget.value)}} />
                </div>
                <input type="submit" value="Sign Up Bro!" />
            </form>
        </main>
    )
    
}