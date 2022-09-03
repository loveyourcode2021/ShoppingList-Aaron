import React, { useState, useEffect } from 'react';
import NewReview from "./NewReview"

import "../../styles/rewivew.css"



const MainReviews = ({srcUrl}) => {
    
    return (
        <>
        <div className="reviewlist-container">

            <div>
                <NewReview srcLink={srcUrl} />
            </div>
            
        </div>
        </>
    );
}

export default MainReviews
