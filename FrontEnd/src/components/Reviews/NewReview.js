import React, { useState, useEffect } from 'react';
import { Reviews } from "../../requests";
import StarsRating from 'stars-rating'
import uniqid from 'uniqid';
import { useNavigate, useParams  } from "react-router-dom";

import ShowReview from "./ShowReview"

const NewProduct = () => {
    const [reviews, setReviews] = useState([])
    const params = useParams();
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(true)
    const [rating, setRating] = useState(null)
    const ratingChanged = (newRating) => {
        setRating(newRating)
      }

    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();
        // do cool stuff here
        const formData = new FormData(currentTarget)


        const newReviewData = {
            "review_id": uniqid.time(),
            "product_id": params.id,
            "rating": rating,
            "review_body": formData.get("review_body"),
            "created_at": new Date()
        }
        console.log(newReviewData)
        Reviews.create(newReviewData, params.id).then(resData => {
            console.log(resData.json)
        })
        Reviews.index(params.id).then(res => {
            setReviews(res)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }
     


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
            {isLoading ?(<h3>Review List is Loadings</h3>) :
            (
                    <ShowReview reviews={reviews}/>
            )}
            </div>
        </div>
        </>
    );
}

export default NewProduct
