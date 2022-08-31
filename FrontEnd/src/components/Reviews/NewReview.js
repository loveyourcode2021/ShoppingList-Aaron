import React, { useState, useEffect } from 'react';
import { Reviews } from "../../requests";
import StarsRating from 'stars-rating'
import uniqid from 'uniqid';

import { useNavigate, useParams  } from "react-router-dom";


import { useNavigate as navigate } from "react-router-dom";


const NewProduct = () => {
    const params = useParams();
    const navigate = useNavigate()
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
            "description": formData.get("review_body"),
            "created_at": new Date()
        }
        Reviews.creates(newReviewData).then(resData => {
            console.log(resData.json)
        })
     
    }


    return (

        <>

        <div className="App">

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






        </div>
        </>
    );
}

export default NewProduct
