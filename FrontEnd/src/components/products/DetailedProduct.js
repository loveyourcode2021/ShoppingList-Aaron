import React from "react"
import { NavLink } from "react-router-dom";


const DetailedProduct = ({product}) => {
    const time = parseInt(product.createdAt.seconds.toString()+product.createdAt.nanoseconds.toString())
    // const year = new Date().getFullYear()
    // const recordedTime = new Date(product.createdAt.seconds)
    // const recordedDate = recordedTime.getDay()
    // const recordedMonth = recordedTime.getMonth()
    // const current_year = year
  
    return (
        <div>
            <NavLink to={`/products/${product.product_id}`} >
            <h3>{product.name}</h3>
            </NavLink>
            <p>{ time}</p>
        </div>
    )
}
export default DetailedProduct