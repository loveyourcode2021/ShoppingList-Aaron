import React,{useState,useEffect} from "react"

import { Products } from "../../requests"
import { useNavigate, useParams  } from "react-router-dom";

const EditProduct = () => {
    const [productItem,setProductItem] = useState([])
    const params = useParams()
    const [isLoading,setLoading] = useState(true)
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [mediaUrl, setMediaUrl] = useState("")
    //mount the information
    const navigate = useNavigate()

    useEffect(() => {
        Products.show(params.id).then(data =>{
            console.log("ProductList ")
            console.log(data)
            setProductItem(data)
            setId(data.id)
            setName(data.name)
            setDescription(data.description)
            setPrice(data.price)
            setMediaUrl(data.media_url)
            setLoading(false)
        })
    },[])

    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();
     
        const formData = new FormData(currentTarget)
        console.log("edit submit",formData,formData.get('product_id'),formData.get('product_name'));
        const newProductData = {
            product_id:params.id,
            name: formData.get('product_name'),
            description: formData.get("product_description"),
            price: formData.get("product_price"),
            media_url: formData.get("product_image"),
        }
        console.log(newProductData,productItem.product_id, productItem)
        Products.edit(newProductData,productItem.product_id)
            .then(response => {
                console.log(response);
                navigate(`/products/${params.id}`)
        })
    }
  
    return (
        <div>
           <div>
    
            {
            isLoading? (
            <>
                <h3>EDit is loading </h3>
            </>):(
                <div>
                <form id="newProductForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="product_name">Product Name:</label>
                    <input type="text" name="product_name" id="product_name"  value={name} onChange={e=>setName(e.target.value)}/>
                </div>
                
                <div>
                    <label htmlFor="product_description">Description:</label>
                    <input type="text" name="product_description" id="product_description"  value={description} onChange={e=>setDescription(e.target.value)}/>
                </div>
  
                <div>
                    <label htmlFor="product_price">Price</label>
                    <input type="number" name="product_price" id="product_price" value={price} onChange={e=>setPrice(e.target.value)} steps="0.01"/>
                </div>
                
                <div>
                    <label htmlFor="product_media_url">ImageUrl:</label>
                    <input type="text" name="product_media_url" id="product_media_url"value={mediaUrl} onChange={e=>setMediaUrl(e.target.value)} />
                </div>
                <input type="submit" value="Edit"/>
                </form>
                </div>
            )}
        </div>
        </div>
    )
}
export default EditProduct