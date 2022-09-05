import express from 'express';
import { addDoc, collection, doc, deleteDoc, where, query, getDoc, getDocs, updateDoc, onSnapshot, serverTimestamp, collectionGroup } from 'firebase/firestore';

import { collections, db, storage } from '../firebase.js';
import { ref, uploadBytes, getDownloadURL, listAll, list, } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import * as cheerio from 'cheerio';
import axios from 'axios';


const router = express.Router();


router.get('/', async (req, res) => {
    const productsList = []
    const productSnapShot = await getDocs(collection(db, collections.PRODUCTS))
    productSnapShot?.forEach(async (docs) => {
        productsList.push(docs.data())
    })
    res.json(productsList)
})

//creates new product
router.post('/new', async (req, res) => {

    const {
        product_id,
        src_url,
    } = req.body

    const existingProductsQuery = query(collection(db, collections.PRODUCTS), where("src_url", "==", src_url));
    const existingProductsSnapshot = await getDocs(existingProductsQuery)

    if (existingProductsSnapshot.empty) {
        try {
            const rawHtml = await axios.get(src_url,
                {
                    headers: {
                        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0"
                    }
                })
            const $ = cheerio.load(rawHtml.data)
            //.find('li:first').find("span").text().trim()
            const name = $('div[data-feature-name="title"]').find('span[id="productTitle"]').text().trim()
            const descriptionText = [];
            const description = $('div[data-feature-name="featurebullets"]').find('ul > li').each(async (index, elem) => {
                descriptionText.push($(elem).text().trim());
            })
            $('div[data-feature-name="apex_desktop"]').find('ul[class="a-unordered-list"]').each(async (ele, ind) => {
                if (ind === 0) {
                    description = $(ele).find('span').text().trim()
                }
            })
            const media_url = $('li[data-csa-c-posy="1"]').find('img').attr('src')
            const price = parseFloat($('div#corePrice_feature_div').find('span.a-offscreen').text().replace(/[^\d.]/g, ''));

            const newProduct = {
                product_id,
                media_url,
                name,
                descriptionText,
                price,
                src_url,
                createdAt: new Date()
            }

            const newProductRef = await addDoc(collection(db, collections.PRODUCTS), newProduct)
            // const responseJson = { ...newProductRef, id: newProductRef.id }
            res.status(200).json({ message: "product added" })
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    } else { // product already in database
        res.status(406).json({ message: "product already in database!" })
    }

})

//creates new product
// router.post('/new', async (req, res) => {

//     const {
//         product_id,
//         name,
//         description,
//         price,
//         media_url
//     } = req.body

//     const newProduct = {
//         product_idLu,
//         name,
//         description,
//         price,
//         media_url,
//         createdAt: new Date()
//     }



//     try {
//         const rawHtml = await axios.get(url,
//             {
//                 headers: {
//                     'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0"
//                 }
//             })
//         const $ = cheerio.load(rawHtml.data)
//         const newProductRef = await addDoc(collection(db, collections.PRODUCTS), newProduct)
//         const responseJson = { ...newProductRef, id: newProductRef.id }
//         res.status(200).send("all good!")
//     } catch (error) {
//         console.log(`Error: ${error}`);
//     }
// })


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
        name,
        description,
        price,
        media_url
    } = req.body


    const newProduct = {
        name,
        description,
        price,
        media_url,
        createdAt: new Date()
    }

    const q = query(collection(db, collections.PRODUCTS), where("product_id", "==", req.params.id))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {

        await updateDoc(doc.ref, newProduct).then(data => { res.send(data) })

            .catch(e => {
                res.send(e)
            });

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
