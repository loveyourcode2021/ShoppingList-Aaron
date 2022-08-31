import React, { useState, useEffect } from 'react';
import { Products } from "../../requests";
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";

import { useNavigate  } from "react-router-dom";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
import NewReview from "./NewReview"
import ShowReview from "./ShowReview"
import "./rewivew.css"
import { useNavigate as navigate, Outlet } from "react-router-dom";


const MainReviews = () => {
    
    return (
        <>
        <div className="reviewlist-container">

            <div>
                <NewReview/>
            </div>
            <div>
                <ShowReview/>
            </div>
        </div>
        </>
    );
}

export default MainReviews
