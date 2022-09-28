import React from "react"
import { NavLink } from "react-router-dom";
import uniqid from 'uniqid'
//design support library
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const DetailedProduct = ({product}) => {  
    return (
        
        <TableRow key={uniqid(product.product_id)} className="product-table-row"> 
            <TableCell style={{ width: 300   }} >
            <NavLink style={{ textDecoration: 'none', color: 'white', size:"15px", style:"bold" }} to={`/products/${product.product_id}`}>
            {product.name.substring(0,15)}
            </NavLink>
            </TableCell>
            <TableCell style={{ width: 100, color: 'white' }}>
             ${product.price}
            </TableCell>
            <TableCell style={{ width: 200 ,color: 'white'}} >
            {new Date(product.createdAt.seconds*1000).toLocaleString()}
            </TableCell>
        </TableRow>
    )
}
export default DetailedProduct
//classNmae="product-table-cell"