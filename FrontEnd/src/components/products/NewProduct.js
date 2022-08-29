import React, { useState, useEffect } from 'react';
import { Products } from "../../requests";
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import { useNavigate  } from "react-router-dom";
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
    const fileTypes = ["JPEG", "JPG", "PNG", "GIF", "MOV"];
    const [file, setFile] = useState(null);
    const [isFileLoading, setFileLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);
    const imagesListRef = ref(storage, "images/");
    const handleChange = (file) => {
        setFile(file);
        setImageUpload(file)
        setFileLoading(false)
        console.log("file loaded")
    };
    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();
        // do cool stuff here
        const formData = new FormData(currentTarget)
        const newProductData = {
            product_id: formData.get('product_id'),
            name: formData.get('product_name'),
            description: formData.get("product_description"),
            price: formData.get("product_price"),
            media_url: formData.get("product_media_url"),
        }
        console.log(newProductData)
        Products.create(newProductData)
            .then(response => {
                console.log(response);
        })
 
 
        const imageRef = ref(storage, `images/${file[0].name}`);
        uploadBytes(imageRef, file[0]).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
        
        if( imageUrls.length>0){
            navigate("/")
        }

         //Case1-----Start
        // formData.append('file', file[0])
        // console.log(file[0])
        
        // Products.create_axios(formData).then(res => res.json())
        //Case1-----ending


        //Case2-----Start
        // Products.create(formData)
        //     .then(response => {
        //         console.log(response);
        //         //navigate("/")
        //     })
         //Case2-----ENDING

    }


    return (
        <>
        <div className="App">

            <div>
                <h2>Create a new product!</h2>
                <form id="newProductForm" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="product_id">Product ID:</label>
                        <input type="text" name="product_id" id="product_id" />
                    </div>
                    <div>
                        <label htmlFor="product_name">Product Name:</label>
                        <input type="text" name="product_name" id="product_name" />
                    </div>

                    <div>
                        <label htmlFor="product_description">Description:</label>
                        <input type="text" name="product_description" id="product_description" />
                    </div>

                    <div>
                        <label htmlFor="product_price">Price</label>
                        <input type="number" name="product_price" id="product_price" />
                    </div>

                    <div>
                        <label htmlFor="product_media_url">ImageUrl:</label>
                        <input type="text" name="product_media_url" id="product_media_url" />
                    </div>


                    <div>
                        <h1>Hello To Drag & Drop Files</h1>
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

        </div>
        </>
    );
}

export default NewProduct
