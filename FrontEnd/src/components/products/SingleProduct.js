import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom";
import { Products } from "../../requests"
import { useParams, Outlet } from "react-router-dom";

const SingleProduct = () => {
   
  
    return (
        <>
        <div>
            <Outlet></Outlet>
        </div>
        </>
    )
}
export default SingleProduct