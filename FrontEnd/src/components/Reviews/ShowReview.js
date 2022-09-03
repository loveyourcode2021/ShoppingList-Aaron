import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { Reviews } from "../../requests";
import StarsRating from 'stars-rating'

const NewProduct = ({reviews, scrap_list}) => {
    var params = useParams();
  

    useEffect(()=> {
        console.log("show rewviews >>", reviews)
        
    },[])
    return (
    <div>
        <h3>This Section is to show Reviews</h3>
    
            <>
            <div>
                <h3>--Users Review--</h3>
                {
                reviews.map((element => 
                { 
                   return ( 
                   <div key={element.reivew_id}>
                    <StarsRating
                    count={element.rating}
                    size={24}
                    color1={'#ffcc00'} /> 
                    <p>
                    Description : {element.review_body}
                    </p>
                    <h1>element</h1>
                    </div> 
                    ) 
                }))
                }
                <h3>--Amazon Review--</h3>
                {
                    scrap_list.map(scrap =>
                    {
                        return ( 
                            <div key={scrap.reivew_id}>
                             <StarsRating
                             count={scrap.rating}
                             size={24}
                             color1={'#ffcc00'} /> 
                             <p>
                             Description : {scrap.review_body}
                             </p>
                             <h1>{new Date(scrap.createdAt.seconds *1000).toLocaleString()}</h1>
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