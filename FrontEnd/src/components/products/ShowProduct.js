import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom";
import { Products } from "../../requests"
import { useParams } from "react-router-dom";

const ShowProduct = () => {
    const [productItem,setProductItem] = useState([])
    const params = useParams()
    const [isLoading,setLoading] = useState(true)
    const [deleteUrl,setDeleteUrl] = useState("")
    const [editUrl, setEditUrl] = useState("")
    //mount the information

    useEffect(() => {
        Products.show(params.id).then(data =>{
            console.log("ProductList ")
            console.log(data)
            setProductItem(data)
            setLoading(false)
            setDeleteUrl("/products/"+params.id.join("")+"/delete" )
            setEditUrl("/products/"+params.id.join("")+"/edit")
        })
    },[])
  
    return (
        <div>
           <div>
    
            {
            isLoading? (
            <>
                <h3>ProductList is loading </h3>
            </>):(
                <div>
                    <h3><image src={productItem.product_img}></image></h3>
                    <h3>title: {productItem.name}</h3>
                    <h3>Description: {productItem.description}</h3>
                    <h3>Description: {productItem.price}</h3>
                    <a href={editUrl}className="menu-item">Edit</a>
                    <a href={deleteUrl}  className="menu-item">Delete</a>
                </div>
            )}
        </div>
        </div>
    )
}
export default ShowProduct