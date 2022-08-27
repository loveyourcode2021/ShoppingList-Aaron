import React, { useEffect,useState } from "react"
import { Outlet } from "react-router-dom"
import {Products} from "../../requests"
import DetailedProduct from "./DetailedProduct"

const MainProducts = () => {
  
    return (
        <div>
        <h1>Products</h1>
        <Outlet />
        </div>
        
    )
}



export default MainProducts

      