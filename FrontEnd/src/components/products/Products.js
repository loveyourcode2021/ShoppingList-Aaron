import React, { useEffect,useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import "../../styles/product.css";
const MainProducts = ({currentUser}) => {
  
        return (
            <div>
            <Outlet />
            </div>
        )
    
     
  
 
}



export default MainProducts

      