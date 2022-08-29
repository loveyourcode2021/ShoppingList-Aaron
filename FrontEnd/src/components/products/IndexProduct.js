import React, { useEffect,useState } from "react"
import { Outlet } from "react-router-dom"
import {Products} from "../../requests"
import DetailedProduct from "./DetailedProduct"
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { storage } from "../../firebase";
const IndexProduct = () => {
    //product list container
    const [productList,setProductList] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    //boolean 
    const imagesListRef = ref(storage, "images/");
    const [isLoading,setLoading] = useState(true)
    //mount the information
    useEffect(() => {
        Products.index().then(data =>{
            console.log("ProductList ")
            console.log(data)
            setProductList(data)
            setLoading(false)
        })
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                setImageUrls((prev) => [...prev, url]);
              });
            });
          });
    },[])
    return (
        <div>
         {
         isLoading? (
         <>
             <h3>ProductList is loading</h3>
         </>):(
            <div>
                 {
                     productList.map( (product, index) => {
                        return (                             <div key={index}>
                                 <DetailedProduct product = {product}/>
                             </div>                         )    
                    })
                 }
                  {imageUrls.map((url) => {
                    return <img src={url} />;
                })}
            </div>
         )}
        </div>
        
    )
}



export default IndexProduct

      