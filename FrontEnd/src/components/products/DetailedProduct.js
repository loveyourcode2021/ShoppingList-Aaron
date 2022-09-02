import React from "react"
import { NavLink } from "react-router-dom";
import uniqid from 'uniqid'

const DetailedProduct = ({product}) => {
    const time = parseInt(product.createdAt.seconds.toString()+product.createdAt.nanoseconds.toString())
    // const year = new Date().getFullYear()
    // const recordedTime = new Date(product.createdAt.seconds)
    // const recordedDate = recordedTime.getDay()
    // const recordedMonth = recordedTime.getMonth()
    // const current_year = year
  
    return (
        <div key={uniqid(product.product_id)}>
            <NavLink to={`/products/${product.product_id}`} >
            <h3>{product.name}</h3>
            </NavLink>
            <p>{new Date(product.createdAt.seconds*1000).toLocaleString()}</p>
        </div>
    )
}
export default DetailedProduct