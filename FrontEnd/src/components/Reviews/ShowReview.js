import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { Reviews } from "../../requests";
import StarsRating from 'stars-rating'
const NewProduct = ({reviews}) => {
    var params = useParams();
  

    useEffect(()=> {
        console.log("show rewviews component is being called")
  
    },[])
    return (
    <div>
        <h3>This Section is to show Reviews</h3>
    
            <>
            <div>
                {
                reviews.map((element => 
                { 
                   return ( <div key={element.reivew_id}>
                    <StarsRating
                    count={Element.rating}
                    size={24}
                    color2={'#ffd700'} /> 
                    <p>
                    Description : {element["description"]}
                    </p>
                    </div> ) 
                }))
                }
            </div>
            </>
     
    </div>)
}
export default NewProduct