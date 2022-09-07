import express from 'express';
import { writeBatch, addDoc, collection, doc, deleteDoc, where, query, getDoc, getDocs, updateDoc, onSnapshot, serverTimestamp, collectionGroup } from 'firebase/firestore';
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
    const { product_id, review_id, title, rating, review_body, createdAt } = req.body
    try {
        const reviewData = {
            review_id,
            product_id,
            title,
            rating,
            review_body,
            createdAt
        }
        const newReviewRef = await addDoc(collection(db, collections.REVIEWS), reviewData);
        const newReviewDoc = await getDoc(newReviewRef)
        res.status(200).json(newReviewDoc.data())

    } catch (error) {
        console.log(`Error: ${error}`);
        res.json(error)
    }
})


//deletes all reviews related product id
router.post('/:id/delete/all', async (req, res) => {
    const batch = writeBatch(db);
    try {
        const product_id = req.params.id
        const review_query = query(collection(db, collections.REVIEWS), where("product_id", "==", product_id));
        const review_query_snapshot = await getDocs(review_query);
        review_query_snapshot.forEach(async (doc) => {
            batch.delete(doc.ref)
        });
        await batch.commit();
        const product_query = query(collection(db, "products"), where("product_id", "==", product_id));
        const product_query_snapshot = await getDocs(product_query);
        product_query_snapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref)
        });

        res.status(202).json({ message: "Successfully Deleted" })
    } catch (e) {
        res.status(405).json({ message: e })
    }

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
                const review_body = $(elem).find('span[data-hook="review-body"]').text().trim()

                const reviewData = {
                    "review_id": uniqid.time(),
                    product_id,
                    title,
                    rating,
                    review_body,
                    createdAt,
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