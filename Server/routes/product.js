import express from 'express';
import { addDoc, collection, doc, deleteDoc, where, query, getDoc, getDocs, updateDoc, onSnapshot, serverTimestamp, collectionGroup } from 'firebase/firestore';

import { collections, db, storage } from '../firebase.js';


const router = express.Router();
// TODO add db import
/**
 * description
""""
name
""""
price
0
product_img
""""
product_reviews
0
 */

router.get('/', async (req, res) => {

    const productsList = []
    const productSnapShot = await getDocs(collection(db, collections.PRODUCTS))
    productSnapShot?.forEach(async (docs) => {
        productsList.push(docs.data())
    })

    res.json(productsList)
})


router.post('/new', async (req, res) => {

    // const { product_id, product_name, product_description, product_price, product_media_url, 
    //         product_files} = req.body;
    // const newProduct = {
    //     product_id,
    //     product_name,
    //     product_description,
    //     product_price,
    //     product_price,
    //     product_media_url,
    //     createdAt: new Date() 
    // }

    const {
        product_id,
        name,
        description,
        price,
        media_url
    } = req.body

    const newProduct = {
        product_id,
        name,
        description,
        price,
        media_url,
        createdAt: new Date()
    }



    try {
        const newProductRef = await addDoc(collection(db, collections.PRODUCTS), newProduct)
        const responseJson = { ...newProductRef, id: newProductRef.id }
        res.status(200).send("all good!");

    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

//√√√√√ by bob
//needs to upgrade!!
// router.post('/new', async (req, res) => {
//     const what_is_it = req.body;
//     what_is_it
//     const {
//         product_id,
//         name,
//         description,
//         price,
//         imageUrl,
//         mediaFile
//     } =  JSON.stringify(req.body);

//     const newProduct = {
//         product_id,
//         name,
//         description,
//         price,
//         imageUrl,
//         createdAt: new Date()
//     }
//     console.log("got the file", newProduct)

//     try {
//         newProduct = JSON.stringify(newProduct)
//         const newProductRef = await addDoc(collection(db, collections.PRODUCTS), newProduct)

//         const responseJson = { ...newProductRef, id: newProductRef.id }


//         res.send(responseJson);
//     } catch (error) {
//         console.log(`Error: ${error}`);
//     }
// })


// const upload = multer({storage: multer.memoryStorage()});
// router.post("/new", upload.single("file"), async function(req, res, next) {
//     try{

//     const {file, body} = req
//     // Upload file and metadata to the object 'images/mountains.jpg'
//         if(file){

//                 const storageRef = ref(storage, 'images/' + body.product_id+".jpeg");
//                 const url = getFileURL(req.file);

//                 uploadBytes(storageRef, blob).then((snapshot) => {
//                     console.log('Uploaded a blob or file!');
//                 });
//         }

//     }catch(e){
//         res.send(e)
//     }

// });



//hook up specific one item and display
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const q = query(collection(db, collections.PRODUCTS), where("product_id", "==", id));
    let foundData = ""
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        foundData = doc.data()

    });
    !!foundData ? res.send(foundData) : res.status(400).send("not found")


})

//edit middle ware
router.patch('/:id/edit', async (req, res) => {

    const data = req.body;
    // const { product_id, name, price, product_img, description } = req.body;
    const {
        product_id,
        name,
        description,
        price,
        media_url
    } = req.body


    const newProduct = {
        product_id,
        name,
        description,
        price,
        media_url,
        createdAt: new Date()
    }

    const q = query(collection(db, collections.PRODUCTS), where("product_id", "==", req.params.id))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {

        try {
            const updatedDoc = await updateDoc(doc.ref, newProduct)
            res.send(updatedDoc)
        } catch (error) {
            res.send(error)
        }
    })
})

router.post('/:id/delete', async (req, res) => {

    const product_id = req.params.id
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
