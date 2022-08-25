import { useState } from "react"
import { products } from "../../requests";
import { useNavigate } from "react-router-dom";
const NewProduct = () => {
    let navigate = useNavigate();
    // things to add
    // const newProduct = {
    //     product_id,
    //     name,
    //     price,
    //     product_img,
    //     description
    // }

    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();
        // do cool stuff here
        const formData = new FormData(currentTarget)
        console.log(formData);
        const newProductData = {
            product_id: formData.get('productId'),
            name: formData.get('productName'),
            price: formData.get("productPrice"),
            product_img: formData.get("productImage"),
            description: formData.get("productDescription"),
        }
        products.create(newProductData)
            .then(response => {
                console.log(response);
                navigate("/")
            })
    }

    return (
        <div>
            <h2>Create a new product!</h2>
            <form id="newProductForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productId">Product ID:</label>
                    <input type="text" name="productId" id="productId" />
                </div>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" name="productName" id="productName" />
                </div>
                <div>
                    <label htmlFor="productPrice">Price</label>
                    <input type="number" name="productPrice" id="productPrice" />
                </div>
                <div>
                    <label htmlFor="productImage">Image:</label>
                    <input type="text" name="productImage" id="productImage" />
                </div>
                <div>
                    <label htmlFor="productDescription">Description:</label>
                    <input type="text" name="productDescription" id="productDescription" />
                </div>
                <input type="submit" />
            </form>
        </div>
    )
}

export default NewProduct
