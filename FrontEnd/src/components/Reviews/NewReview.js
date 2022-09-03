import React, { useState, useEffect } from 'react';
import { Reviews } from "../../requests";
import StarsRating from 'stars-rating'
import uniqid from 'uniqid';
import { useNavigate, useParams } from "react-router-dom";

import ShowReview from "./ShowReview"

const NewProduct = ({ srcLink }) => {
    const [review_list, setReviewsList] = useState([])
    const params = useParams();
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(true)
    const [rating, setRating] = useState(null)
    const [scraps, setScrap] = useState(null)
    const pid = params.id
    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();
        // do cool stuff here
        const formData = new FormData(currentTarget)
        setReviewsList([])

        const newReviewData = {
            "review_id": uniqid.time(),
            "product_id": params.id,
            "rating": rating,
            "review_body": formData.get("review_body"),
            "created_at": new Date()
        }
        console.log(newReviewData)
        //it works
        Reviews.create(newReviewData, params.id).then(resData => {
            console.log(resData.json)
        })

        //here does not work
        Reviews.index(pid).then(res => {
            setReviewsList(res)
            console.log("my new datas are >>", review_list)
            setLoading(false)
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        console.log("amazon>>>", srcLink)
        console.log("newReview Called?")
        Reviews.index(pid).then(res => {
            setReviewsList(res)
            console.log("my new datas are >>", review_list)


        }).catch(err => {
            console.log(err)
        })

        console.log("Amazon Scraping started")
        const productData = {
            "url": srcLink,
            "product_id": pid
        }
        Reviews.getScrap(productData).then((res) => {
            setScrap(res)
            console.log("amazon", res)
            setLoading(false)
        })

    }, [])


    return (
        <>
            <div className='App'>
                <div>
                    <h2>this is a new Review!</h2>
                    <form id="newProductForm" onSubmit={handleSubmit}>
                        <StarsRating
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            color2={'#ffd700'} />
                        <div>
                            <label htmlFor="review_body">Description:</label>
                            <input type="text" name="review_body" id="review_body" />
                        </div>
                        <input type="submit" />
                    </form>
                </div>
                <div>
                    {isLoading ? (<h3>Review List is Loadings</h3>) :
                        (
                            <ShowReview reviews={review_list} scrap_list={scraps} />
                        )}
                </div>
            </div>
        </>
    );
}

export default NewProduct
