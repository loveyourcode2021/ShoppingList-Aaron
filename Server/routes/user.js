import express from 'express';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.js';
const router = express.Router();


// TODO add firebase and db, etc. etc.
//product belongs to user table and has many reviews table
// products table
// title :string
// description: string
// imageUrl: string
// review_id: referece?
// writer: user.email
const COOKIE_MAX_AGE = 24 * 7 * 60 * 60 * 1000;


router.get('/current', async (req, res, next) => {
    if ("data" in req.cookies) {
        res.json({ "data": req.cookies.data })
    } else {
        res.json({ "data": null })
    }
});

router.post('/signin', async (req, res, next) => {

    try {
        if (!!req.body.email === false || !!req.body.password === false) {
            return res.status(422).json({
                email: "email is required",
                password: "password is required"
            })
        }
        const { email, password } = req.body;
        console.log("email", email)
        console.log("password", password)
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log("user", userCredential.user)
                res.cookie("data", userCredential.user, { maxAge: COOKIE_MAX_AGE });
                res.json(userCredential)

            })
            .catch((error) => {
                res.send(error)

            })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body;
    if (!!email === false || !!password === false) {
        return res.status(422).json({
            email: "email is required",
            password: "password is required"
        })
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            res.cookie("data", userCredential.user, { maxAge: COOKIE_MAX_AGE });
            console.log(req.cookies["data"])
            res.send(userCredential.user);
        })
        .catch((error) => {
            console.log(`Something bad happened lol: ${error.code}`);
        })
});

router.delete('/signout', async (req, res, next) => {
    res.clearCookie("data");
    res.json({ cookie: "data" in req.cookies })
});

export default router;
