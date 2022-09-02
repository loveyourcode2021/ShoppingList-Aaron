import React, { useEffect,useState } from "react"
import { Outlet } from "react-router-dom"
import {Products} from "../../requests"
import DetailedProduct from "./DetailedProduct"
import uniqid from 'uniqid';

const IndexProduct = () => {
    //product list container
    const [productList,setProductList] = useState([])

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
      //if loading is true, shows loading
      // else loads the whole data and display line between 48-52
        <div>
         {
         isLoading? (
         <>
             <h3>ProductList is loading</h3>
         </>):(
            <div>
                 {
                     productList.map( (product, index) => {
                        return (                             
                              <div key={uniqid.time()} className="card">
                                 <DetailedProduct product = {product}/>
                             </div> )    
                    })
                 }
              
            </div>
         )}
        </div>
        
    )
}



export default IndexProduct

      