import React,{useState,useEffect} from "react"
import { Link, NavLink } from "react-router-dom";
import { Products } from "../../requests"
import { useParams, Outlet } from "react-router-dom";
import MainReviews from "../Reviews/MainReviews";

const ShowProduct = () => {
    const [productItem,setProductItem] = useState([])
    const params = useParams()
    const [isLoading,setLoading] = useState(true)
    const [isEditOrDelete,setEditOrDelete] = useState(true)
    const [deleteUrl,setDeleteUrl] = useState(`/products/${params.id}/delete` )
    const [editUrl, setEditUrl] = useState(`/products/${params.id}/edit`)
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
                <div>
              
                    <h3>title: {productItem.name}</h3>
                    <h3>Description: {productItem.description}</h3>
                    <h3>Description: {productItem.price}</h3>
                    <a href={editUrl}className="menu-item" onClick={handleRoute}>Edit</a>
                    <a href="/" className="menu-item" onClick={e => handleDelete(e)}>Delete</a>
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