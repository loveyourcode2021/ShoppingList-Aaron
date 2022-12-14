import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Reviews } from "../../requests";
import StarsRating from 'stars-rating'

const NewProduct = ({ reviews, scrap_list }) => {
    var params = useParams();
    useEffect(() => {
        console.log("show rewviews >>", reviews)
    }, [])
    
    return (
        <div>
            <>
                <div>
                    <h2> Reviews </h2>
                    {
                        scrap_list.map((scrap) => {
                            return (
                                <div className='single-review' key={scrap.review_id}>
                                    <StarsRating
                                        count={scrap.rating}
                                        size={24}
                                        color1={'#ffcc00'} />
                                    <h2>{scrap.title}</h2>
                                    <h3>{scrap.createdAt}</h3>
                                    <p>
                                        Description : {scrap.review_body}
                                    </p>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </>

        </div>)
}
export default NewProduct