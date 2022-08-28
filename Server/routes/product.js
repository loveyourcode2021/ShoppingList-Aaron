import express from 'express';
import { addDoc, collection, doc, deleteDoc, where, query, getDoc, getDocs, updateDoc, onSnapshot, serverTimestamp, collectionGroup } from 'firebase/firestore';
import { collections, db } from '../firebase.js';

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


//needs to upgrade!!
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
        imageUrl,
        mediaFile
    } = req.body;

    const newProduct = {
        product_id,
        name,
        description,
        price,
        imageUrl,
        createdAt: new Date()
    }
    console.log("got the file", newProduct)
    console.log("got the file", req.body)
    console.log("got the file", req.params)
    // const file_name = product_id+"-"+product_media_url.name
    // const data= {
    //     file_name: product_files
    // }
    try {

        const newProductRef = await addDoc(collection(db, collections.PRODUCTS), newProduct)

        const responseJson = { ...newProductRef, id: newProductRef.id }
        // const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        // uploadBytes(imageRef, imageUpload).then((snapshot) => {
        //   getDownloadURL(snapshot.ref).then((url) => {
        //     setImageUrls((prev) => [...prev, url]);
        //   });
        // });
        res.send(responseJson);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

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
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    // const { product_id, name, price, product_img, description } = req.body;
    const { product_id,
        name,
        description,
        price,
        image, } = req.body;

    const newProduct = {
        product_id,
        name,
        description,
        price,
        image,
        createdAt: new Date()
    }

    const productDoc = collection(db, collections.PRODUCTS, id)

    const result = await updateDoc(productDoc, newProduct).then(res => {
        res.status(200).send(res);
    }).catch(e => {
        res.status(403).send(e);

    });
})
router.post('/delete', async (req, res) => {
    // the actual name or id of the document we want to delete, is a bunch of random letters and numbers that we dont know
    // but we do know the product id
    // so we run a query to find products with a matching id, and then we dont need to know the random letters and numbers, it will delete the corresponding product
    const { product_id } = req.body
    // get a reference for the products collection
    const productsRef = collection(db, collections.PRODUCTS)
    // write a query statement:
    // look inside the productsRef collection, and find all matching documents where product_id == product_id
    const q = query(productsRef, where("product_id", "==", product_id));
    // pass that query into the getDocs method, which returns a QuerySnapshot
    const matchingProducts = await getDocs(q)
    // we loop over the results in the snapshot array
    if (matchingProducts.length > 0) {
        matchingProducts.forEach(async (matchingProduct) => {
            // each matchingProduct has a ref property, which is of a type DocumentReference, which is what deleteDoc requires to function
            await deleteDoc(matchingProduct.ref)
        })
        res.send(`Deleted ${product_id}`)
    } else { // we did not find a matching product
        res.send(`Could not find matching product with product id ${product_id}`)
    }


})

export default router;
