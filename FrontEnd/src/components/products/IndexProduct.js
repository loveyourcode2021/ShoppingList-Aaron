import React, { useEffect,useState } from "react"
import { Outlet } from "react-router-dom"
import {Products} from "../../requests"
import DetailedProduct from "./DetailedProduct"

const IndexProduct = () => {
    //product list container
    const [productList,setProductList] = useState([])
    //boolean 
    const [isLoading,setLoading] = useState(true)
    //mount the information
    useEffect(() => {
        Products.index().then(data =>{
            console.log("ProductList ")
            console.log(data)
            setProductList(data)
            setLoading(false)
        })
    },[])
    return (
        <div>
         {
         isLoading? (
         <>
             <h3>ProductList is loading </h3>
         </>):(
            <div>
                 {
                     productList.map( (product, index) => {
                        return (
                             <div key={index}>
                                 <DetailedProduct product = {product}/>
                             </div>                         )    
                    })
                 }
            </div>
         )}
        </div>
        
    )
}



export default IndexProduct

      