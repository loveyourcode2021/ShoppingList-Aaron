import React, { useState,  } from 'react';
import { Products } from "../../requests";
import uniqid from 'uniqid';
import { FileUploader } from "react-drag-drop-files";
import { useNavigate,useParams  } from "react-router-dom";

import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { storage } from "../../firebase";




const NewProduct = () => {
    const navigate = useNavigate()

    const fileTypes = ["JPEG", "JPG", "PNG", "GIF", "MOV","AVI","MP4"];
    const [file, setFile] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);

    const handleChange = (file) => {
        setFile(file);
        setImageUpload(file)
        console.log("file loaded", file[0].name)
    };

 
    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();
        // do cool stuff here
        const formData = new FormData(currentTarget)

        const newProductData = {
            "product_id": uniqid.time(),
            name: formData.get('product_name'),
            description: formData.get("product_description"),
            price: formData.get("product_price"),
            media_url: formData.get("product_media_url"),
            src_url: formData.get("product_source_url")
        }

       
        Products.create(newProductData)
            .then(async (response) => {
                console.log("Data Response--->",response);
                
        })

        if(!!file[0]){
            const imageTypes = ["JPEG", "JPG", "PNG", "GIF", "SVG"];
            const videoTypes = ["MOV","AVI","MP4"];
            //check extention 
            const ext = file[0].name.split('.')
            .filter(Boolean)
            .slice(1)
            .join('.')
            
            const containImage = imageTypes.indexOf(ext.toUpperCase())!== -1
            const containVideo = videoTypes.indexOf(ext.toUpperCase())!== -1

            let folderName = ""
            if(containImage){
                folderName = "images"
            }
            if(containVideo) {
                folderName = "videos"
            }
            const mediaRef =  ref(storage, `${newProductData.product_id}/${folderName}/${file[0].name}`);
             uploadBytes(mediaRef, file[0]).then((snapshot) => {
               getDownloadURL(snapshot.ref).then((url) => {
                   setImageUrls((prev) => [...prev, url]);
               });
           });
           
       }
       navigate(`/products/index`)
    }


    return (

        <>
            <div key={uniqid.time()}>
                <h2>Create a new product!</h2>
                <form id="newProductForm" onSubmit={handleSubmit}>
                    
                        <div>
                        <label htmlFor="product_name">Product Name:</label>
                        <input type="text" name="product_name" id="product_name" />
                        </div>
                        <div>
                        <label htmlFor="product_description">Description:</label>
                        <input type="text" name="product_description" id="product_description"/>
                        </div>
                        <div>
                        <label htmlFor="product_price">Price</label>
                        <input type="number" name="product_price" id="product_price" steps="0.01"/>
                        </div>
                        <div>
                        <label htmlFor="product_media_url">ImageUrl:</label>
                        <input type="text" name="product_media_url" id="product_media_url" />
                        </div>
                        <div>
                        <label htmlFor="product_source_url">SourceUrl:</label>
                        <input type="text" name="product_source_url" id="product_source_url" />
                        </div>
                       
                    <div>
                        <h3>Drag & Drop Files</h3>
                        <FileUploader
                            multiple={true}
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                        />
                        <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
                    </div>

                    <input type="submit" />
                </form>
            </div>
        </>
    );
}

export default NewProduct
