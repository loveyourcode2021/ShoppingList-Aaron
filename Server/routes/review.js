import express from 'express';
import { addDoc, collection, doc, deleteDoc, where, query, getDoc, getDocs, updateDoc, onSnapshot, serverTimestamp, collectionGroup } from 'firebase/firestore';
import uniqid from 'uniqid';
import { collections, db, storage } from '../firebase.js';
import * as cheerio from 'cheerio';
import axios from 'axios';


const router = express.Router();


router.get('/:id/index', async (req, res) => {
    try {
        const pid = req.params.id;
        const q = query(collection(db, collections.REVIEWS), where("product_id", "==", pid));
        let review_list = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            review_list.push(doc.data())
        });

        if (review_list.length > 0) {
            res.send(review_list)
        }
    } catch (e) {
        res.send(e)
    }


})
//creates new product
router.post(`/:id/new`, async (req, res) => {
    const { product_id, review_id, rating, review_body } = req.body
    try {
        const reviewData = {
            review_id: uniqid.time(),
            product_id,
            review_id,
            rating,
            review_body,
            "createdAt": new Date()
        }
        await addDoc(collection(db, collections.REVIEWS), reviewData);
        res.status(200).send({ message: "all good!" });

    } catch (error) {
        console.log(`Error: ${error}`);
    }
})


//hook up specific one item and display
// router.get('/:id/reviews/:rid', async (req, res) => {
//     const rid = req.params.rid;
//     const q = query(collection(db, collections.REVIEWS), where("review_id", "==", rid));
//     let foundData = ""
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         foundData = doc.data()

//     });
//     !!foundData ? res.send(foundData) : res.status(400).send("not found")
// })

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
        // doc.data() is never undefined for query doc snapshots
        await updateDoc(doc.ref, newProduct).then(data => res.status(200).send(data))
            .catch(e => {
                res.status(403).send(e)
            });

    })
})
//creates new product
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
//Scrap Amazon
router.post('/getReviews', async (req, res) => {
    const { url, product_id } = req.body;
    // query firestore for existing
    // if no existing docs found
    let reviewsCreated = 0
    const reviewDocs = [];
    const existingReviewsQuery = query(collection(db, collections.REVIEWS), where("product_id", "==", product_id))
    const existingReviewsSnapshot = await getDocs(existingReviewsQuery)
    const existingReviewsFound = !existingReviewsSnapshot.empty
    if (existingReviewsFound) {
        // add each doc to our array of reviewDocs
        existingReviewsSnapshot.forEach(doc => {
            reviewDocs.push(doc.data())
        })
    } else { // we have no existing reviews, and need to scrape the URL
        try {
            const rawHtml = await axios.get(url,
                {
                    headers: {
                        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0"
                    }
                })
            const $ = cheerio.load(rawHtml.data)
            console.log($);
            $('div[data-hook="review"]').each(async (i, elem) => {
                const ratingText = $(elem).find('i[data-hook="review-star-rating"]').text()
                const rating = parseFloat(ratingText.split(' ')[0])
                const title = $(elem).find('a[data-hook="review-title"]').text().trim()
                const createdAt = $(elem).find('span[data-hook="review-date"]').text()
                const reviewBody = $(elem).find('span[data-hook="review-body"]').text().trim()

                const reviewData = {
                    "review_id": uniqid.time(),
                    rating,
                    reviewBody,
                    product_id,
                    createdAt,
                    title
                }

                try {
                    reviewsCreated++;
                    const newReviewDoc = await addDoc(collection(db, collections.REVIEWS), reviewData);
                    reviewDocs.push(newReviewDoc)
                } catch (error) {
                    console.log(error);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    res.json(reviewDocs)

})



export default router;