import React,{useState,useEffect} from "react"
import { Link, NavLink } from "react-router-dom";
import { Products } from "../../requests"
import { useParams, Outlet } from "react-router-dom";
import MainReviews from "../Reviews/MainReviews";
import uniqid from 'uniqid'

import ReactPlayer from 'react-player'
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { storage } from "../../firebase";

import "../../styles/product.css"
const ShowProduct = () => {
    const [productItem,setProductItem] = useState([])
    const params = useParams()
    const [isLoading,setLoading] = useState(true)
    const [isMediaLoading,setMediaLoading] = useState(true)
    const [isEditOrDelete,setEditOrDelete] = useState(true)
    //const [deleteUrl,setDeleteUrl] = useState(`/products/${params.id}/delete` )
    const [editUrl, setEditUrl] = useState(`/products/${params.id}/edit`)
    //set Media URL
    const [productList,setProductList] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    


    //mount the information
    const handleRoute = (e) =>{
        setEditOrDelete(false)
    }

    const handleDelete = (e) =>{
        Products.destory(params.id).then(res => res.json())
    }


    useEffect(() => {
        Products.show(params.id).then(data =>{
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
    },[])
  
    return (
        <>
        <div>
        <div>
      {
            isLoading? (
            <>
                <h3>Fetching single product at the moment </h3>
            </>):(
                <>
                <div  className="product-container">
                    <div>
                    <h3>title: {productItem.name}</h3>
                    <h3>Description: {productItem.description}</h3>
                    <h3>Price: ${productItem.price}</h3>
                    <a href={editUrl}className="menu-item" onClick={handleRoute}>Edit</a>
                    <a href="/" className="menu-item" onClick={e => handleDelete(e)}>Delete</a>
                    </div>
                    <div>
                

                    </div>
                    <div>
                    {
                        isMediaLoading? (<><h3>isLoading</h3></>):
                        (
                        <video width="400" autoPlay muted loop>
                        <source src={imageUrls[0]} type="video/mp4"/>
                        Your Browser does not support HTML video.
                         </video>
                         )

                    }
           
                    </div>
                 
                    
                </div>
    
                <MainReviews/>
   
                </>
            )}
         

        </div>
        </div>
        </>
    )
}
export default ShowProduct