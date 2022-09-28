import React, { useEffect,useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import "../../styles/product.css";
const MainProducts = ({currentUser}) => {
    const navigator  = useNavigate()
    const [user, setUser] = useState();
    useEffect(()=>{
        setUser(currentUser())
        console.log("product main ===",currentUser())
    },[])

    if(!user){
        navigator('/signin')
    }else{
        return (
            <div>
            <Outlet />
            </div>
        )
    }
     
  
 
}



export default MainProducts

      