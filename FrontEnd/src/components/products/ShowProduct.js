import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Products, Reviews } from "../../requests"
import { useParams, } from "react-router-dom";
import MainReviews from "../Reviews/MainReviews";
import uniqid from 'uniqid'
import Box from '@mui/material/Box';

import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../../firebase";

import "../../styles/product.css"
import { Button } from "@mui/material";
const ShowProduct = () => {
    const [productItem, setProductItem] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const [isLoading, setLoading] = useState(true)
    const [isMediaLoading, setMediaLoading] = useState(true)
    const [isEditOrDelete, setEditOrDelete] = useState(true)
    //const [deleteUrl,setDeleteUrl] = useState(`/products/${params.id}/delete` )
    const [editUrl, setEditUrl] = useState(`/products/${params.id}/edit`)
    //set Media URL
    const [productList, setProductList] = useState([])
    const [imageUrls, setImageUrls] = useState([]);



    //mount the information
    const handleRoute = (e) => {
        setEditOrDelete(false)
    }

    const handleDelete = (e) => {
        // Products.destory(params.id).then(res => res.json())
        console.log("I got it here")
        Reviews.delete_all(params.id).then(res => console.log("review deleted=>", res.json()))
        navigate("/products/index")
    }


    useEffect(() => {
        Products.show(params.id).then(data => {
            console.log("ProductList ")
            console.log(data)
            setProductItem(data)
            setLoading(false)
        })
        const imagesListRef = ref(storage, `${params.id}/videos/`);

        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                    setMediaLoading(false)
                });
            });
        });
        console.log(">>>>", imageUrls[0])
    }, [])

    return (
        <>
            <div>
                <div>
                    {
                        isLoading ? (
                            <>
                                <h3>Fetching single product at the moment </h3>
                            </>) : (
                            <>



                                <div className="product-description-row">
                                    <img src={productItem.media_url} alt="alternatetext"></img>
                                    <div class="product-info">
                                        <h2>{productItem.name}</h2>
                                        <h3>{"descprtion" in productItem ? productItem.description : productItem.descriptionText[0]}</h3>
                                        <h2>${productItem.price.toFixed(2)}</h2>
                                    </div>
                                </div>
                                <div className="product-buttons">
                                    <Button
                                        type="button"
                                        variant="contained"
                                        sx={{ margin: 2, minWidth: 80 }}
                                        onClick={() => navigate(editUrl)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        sx={{ margin: 2, minWidth: 80 }}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                </div>
                                <div className="product-video" >
                                    {
                                        isMediaLoading ? (
                                            <><h3>isLoading</h3></>
                                        ) :
                                            (
                                                <video controls height="711" width="400" autoPlay muted loop>
                                                    <source src={imageUrls[0]} type="video/mp4" />
                                                    Your Browser does not support HTML video.
                                                </video>
                                            )

                                    }

                                </div>




                                <MainReviews srcUrl={productItem.src_url} />
                            </>

                        )}


                </div>
            </div>

        </>
    )
}
export default ShowProduct