import React,{useState,useEffect} from "react"
import { navigate} from "react-router-dom";
import { Products } from "../../requests"
import { useParams } from "react-router-dom";

const ShowProduct = () => {
    const [productItem,setProductItem] = useState([])
    const params = useParams()
    const [isLoading,setLoading] = useState(true)

    //mount the information

    useEffect(() => {
        Products.show(params.id).then(data =>{
            console.log("ProductList ")
            console.log(data)
            setProductItem(data)
            setLoading(false)
        })
    },[])

    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();

        const formData = new FormData(currentTarget)
        console.log(formData);
        const newProductData = {
            id: formData.get('product_id'),
            name: formData.get('product_name'),
            price: formData.get("product_price"),
            img: formData.get("product_image"),
            description: formData.get("product_description"),
        }
        Products.edit(newProductData)
            .then(response => {
                console.log(response);
                navigate("/")
        })
    }
  
    return (
        <div>
           <div>
    
            {
            isLoading? (
            <>
                <h3>ProductList is loading </h3>
            </>):(
                <div>
                <form id="newProductForm" onSubmit={handleSubmit}>
             
                <input type="hidden" name="product_id" id="product_id" value={productItem.product_id}/>
                
                <div>
                    <label htmlFor="product_name">Product Name:</label>
                    <input type="text" name="product_name" id="product_name" value={productItem.name}/>
                </div>
                
                <div>
                    <label htmlFor="product_description">Description:</label>
                    <input type="text" name="product_description" id="product_description" value={productItem.description}/>
                </div>
  
                <div>
                    <label htmlFor="product_price">Price</label>
                    <input type="number" name="product_price" id="product_price" value={productItem.price}/>
                </div>
                
                <div>
                    <label htmlFor="product_media_url">ImageUrl:</label>
                    <input type="text" name="product_media_url" id="product_media_url" value={productItem.product_img}/>
                </div>
                <input type="Edit" />
                </form>
                </div>
            )}
        </div>
        </div>
    )
}
export default ShowProduct