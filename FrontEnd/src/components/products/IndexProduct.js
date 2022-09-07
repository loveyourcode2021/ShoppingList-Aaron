import React, { useEffect,useState } from "react"
import { Outlet } from "react-router-dom"
import {Products} from "../../requests"
import DetailedProduct from "./DetailedProduct"
import uniqid from 'uniqid';

//support for desinging
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const IndexProduct = () => {
    //product list container
    const [productList,setProductList] = useState([])

    const [isLoading,setLoading] = useState(true)

    //styles setting
  

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
             <h3>ProductList is loading</h3>
         </>):(
         
            <div className="index-product-mui-talbe-container-1">
                       <h1>Products</h1>
                 <Table className="index-product-mui-talbe-container" size="large">
                      
                        <TableBody>
                            { productList.map( (product, index) => {
                                    return (                             
                                        <div key={uniqid.time()} className="card">
                                            <DetailedProduct product = {product}/>
                                    </div> )    
                                })
                            }
                         </TableBody>
                </Table>
            </div>
         
         )}
        </div>
       
        
    )
}



export default IndexProduct

      