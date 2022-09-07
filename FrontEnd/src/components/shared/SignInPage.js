import React, { useEffect, useState } from "react";
import Navigation from "../NavBar";
import { User } from "../../requests"
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.css';

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
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                crossorigin="anonymous"
            />
            
                <Container id='main-container' className="d-grid h-100">
                    <Form id='sign-in-form' className="text-center" onSubmit={handleSubmit}>
                        {/* {errors.length > 0 ? (
                            <div>
                                <h4>Failed to Sign In</h4>
                                <p>{errors.map(error => error.message).join(", ")}</p>
                            </div>
                        ) : (
                            ""
                        )} */}
                        <img
                            className="mb-4 profile-pic"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            alt='profile pic'
                        >
                        
                        </img>
                        <h1 className="mb-3 fs-3 fw-normal">Sign In </h1>
                        <Form.Group controlId="sign-in-email-address">
                            <Form.Control size='lg' type="text" placeholder="Email Address" className="position-relative form-control form-control-lg" name="email" id="email" onChange={event => {
                                setEmail(event.currentTarget.value)
                            }} />
                        </Form.Group>
                        <Form.Group controlId="sing-in-password">
                            <Form.Control size='lg' type="password" placeholder="Password" name="password" className="position-relative form-control form-control-lg justify-content-center mb-3" id="password" onChange={event => {
                                setPassword(event.currentTarget.value)
                            }} />
                        </Form.Group>
                        <div className="d-grid">
                            <Button variant="primary" size="lg" type="submit"> Sign In </Button>
                        </div>
                    </Form>
                </Container>
        </main>
    )


}