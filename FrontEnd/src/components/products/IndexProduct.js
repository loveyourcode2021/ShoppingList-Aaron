import React, { useEffect, useState } from "react"

import { Products } from "../../requests"
import DetailedProduct from "./DetailedProduct"

//support for desinging
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

const IndexProduct = () => {
    //product list container
    const [productList, setProductList] = useState([])
    const [isLoading, setLoading] = useState(true)

    //mount the information
    useEffect(() => {
       
        Products.index().then(async (data) => {
            console.log("ProductList ")
            console.log(data)
            await setProductList(data)
            await setLoading(false)
        })

    }, [])
    return (
        <div className="index-products-container">
            {
                isLoading ? (
                    <>
                        <h3>ProductList is loading</h3>
                    </>) : (

                    <div className="index-product-mui-talbe-container-1">
                        <h1>Products</h1>
                        <Table className="index-product-mui-talbe-container" size="large">

                            <TableBody>
                                {productList.map((product, index) => {
                                    return (<DetailedProduct key={index} product={product} />)
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

