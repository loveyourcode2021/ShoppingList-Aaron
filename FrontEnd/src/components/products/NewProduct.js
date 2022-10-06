import React, { useEffect, useState, } from 'react';
import { Products } from "../../requests";
import uniqid from 'uniqid';
import { FileUploader } from "react-drag-drop-files";
import { useNavigate, useParams } from "react-router-dom";

import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../../firebase";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';






const NewProduct = () => {
    const navigate = useNavigate()

    const fileTypes = ["JPEG", "JPG", "PNG", "GIF", "MOV", "AVI", "MP4"];
    const [file, setFile] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);

    const handleChange = (file) => {
        setFile(file);
        setImageUpload(file)
        console.log("file loaded", file[0].name)
    };
    useEffect(()=>{
   
    },[])

    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();
        // do cool stuff here
        const formData = new FormData(currentTarget)


        const newProductData = {
            "product_id": uniqid.time(),
            "src_url": formData.get("product_source_url")
        }

        Products.create(newProductData)
            .then(async (response) => {
                console.log("Data Response--->", await response);
                if (!file) {
                    navigate(`/products/index`)
                } else {
                    const imageTypes = ["JPEG", "JPG", "PNG", "GIF", "SVG"];
                    const videoTypes = ["MOV", "AVI", "MP4"];
                    //check extention 
                    const ext = file[0].name.split('.')
                        .filter(Boolean)
                        .slice(1)
                        .join('.')

                    const containImage = imageTypes.indexOf(ext.toUpperCase()) !== -1
                    const containVideo = videoTypes.indexOf(ext.toUpperCase()) !== -1

                    let folderName = ""
                    if (containImage) {
                        folderName = "images"
                    }
                    if (containVideo) {
                        folderName = "videos"
                    }
                    const mediaRef = ref(storage, `${newProductData.product_id}/${folderName}/${file[0].name}`);
                    uploadBytes(mediaRef, file[0]).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                            setImageUrls((prev) => [...prev, url]);
                        });
                    });
                    navigate(`/products/index`)
                }
            })
    }


    return (

        <>
            <div key={uniqid.time()}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Create New Product
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <FileUploader
                                multiple={true}
                                handleChange={handleChange}
                                name="file"
                                types={fileTypes}
                            />
                            <Typography component="h1" variant="h5">
                                {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
                            </Typography>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="product_source_url"
                                label="product_source_url"
                                type="product_source_url"
                                id="product_source_url"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Create New Product
                            </Button>

                        </Box>
                    </Box>
                </Container>
            </div>
        </>
    );
}

export default NewProduct

{/* <h2>Create a new product!</h2>
<form id="newProductForm" onSubmit={handleSubmit}>                       
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
    <div>
        <label htmlFor="product_source_url">SourceUrl:</label>
        <input type="text" name="product_source_url" id="product_source_url" />
    </div>
    <input type="submit" />
</form> */}

