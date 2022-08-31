import express from 'express';
import { addDoc, collection, doc, deleteDoc, where, query, getDoc, getDocs, updateDoc, onSnapshot, serverTimestamp, collectionGroup } from 'firebase/firestore';
import uniqid from 'uniqid';
import { collections, db,storage } from '../firebase.js';
import {ref,uploadBytes,getDownloadURL,listAll,list,} from "firebase/storage";
import {  uploadBytesResumable  } from "firebase/storage";
import { Blob } from "buffer";
import multer from "multer";
import fs from 'fs';


const router = express.Router();


router.get('/:id/reviews', async (req, res) => {

    const reviewsList = []
    const reviewSnapShot = await getDocs(collection(db, collections.REVIEWS))
    reviewSnapShot?.forEach(async (docs) => {
        reviewsList.push(docs.data())
    })

    res.json(reviewsList)
})

router.post('/:id/reviews/new', async (req, res) => {

    try {
        await addDoc(doc(db, collections.REVIEWS), {
            "review_id":req.body.review_id,
            "product_id":req.params.id,
            "rating":req.body.rating,
            "description":req.body.description,
            "createdAt": new Date()
          });
        res.status(200).send({message:"all good!"});
  
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})


//hook up specific one item and display
router.get('/:id/reviews/:rid', async (req, res) => {
    const rid = req.params.rid;
    const q = query(collection(db, collections.REVIEWS), where("review_id", "==", rid));
    let foundData = ""
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        foundData = doc.data()

    });
    !!foundData ? res.send(foundData) : res.status(400).send("not found")
})

//edit middle ware
router.patch('/:id/reviews/:rid/edit', async (req, res) => {
    
    const data = req.body;
    // const { product_id, name, price, product_img, description } = req.body;
    const {
        product_id,
        name,
        description,
        price,
        media_url
    } =  req.body


    const newProduct = {
        product_id,
        name,
        description,
        price,
        media_url,
        createdAt: new Date()
    }

    const q = query(collection(db, collections.PRODUCTS),  where("product_id", "==", req.params.id))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        await updateDoc(doc.ref, newProduct).then(data => res.status(200).send(data))
        .catch(e => {
            res.status(403).send(e)
        });

    })
})

router.post('/:id/reviews/:rid/edit', async (req, res) => {
   
    const  product_id  = req.params.id
    const q = query(collection(db, collections.PRODUCTS), where("product_id", "==", product_id));
    let foundData = ""
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
        .then(data => res.status(200).send(data))
        .catch(e => {
            res.status(403).send(e)
        });
     });
});



export default router;
