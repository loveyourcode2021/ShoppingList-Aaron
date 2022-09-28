import React,{useState,useEffect} from "react"

import { Products } from "../../requests"
import { useNavigate, useParams  } from "react-router-dom";


import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const EditProduct = () => {
    const [productItem,setProductItem] = useState([])
    const params = useParams()
    const [isLoading,setLoading] = useState(true)
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [descriptionText, setDescriptionText] = useState("")
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
            setDescriptionText(data.descriptionText[0])
            setPrice(data.price)
            setMediaUrl(data.media_url)
            setLoading(false)
        })
    },[])

    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();
     
        const formData = new FormData(currentTarget)
        console.log("edit submit",formData,formData.get('product_id'),formData.get('title'));
        const newProductData = {
            product_id:params.id,
            name: formData.get('name'),
            descriptionText: formData.get("descriptionText"),
            price: formData.get("product_price"),
            media_url: formData.get("media_url"),
        }
        console.log(newProductData,productItem.product_id, productItem)
        Products.edit(newProductData,productItem.product_id)
            .then(response => {
                console.log(response);
               
        })
        navigate(`/products/${params.id}`)
    }
  
    return (
        <div>
           <div>
    
            {
            isLoading? (
            <>
                <h3>Edit Page is loading </h3>
            </>):(
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
                    Sign in
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      type="name"
                      name="name"
                      value={name} 
                      onChange={e=>setName(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="descriptionText"
                      label="Description"
                      type="text"
                      id="descriptionText"
                      value={descriptionText} 
                      onChange={e=>setDescriptionText(e.target.value)}
                    />
                  <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*(\.?[0.9]{2})' }}
                      margin="normal"
                      fullWidth
                      name="product_price"
                      label="Price"
                      type="number"
                      id="product_price"
                      value={price} 
                      onChange={e=>setPrice(e.target.value)}
                    />
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="media_url"
                      label="image_url"
                      type="text"
                      id="media_url"
                      value={mediaUrl} 
                      onChange={e=>setMediaUrl(e.target.value)}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Edit Product Info
                    </Button>
      
                  </Box>
                </Box>
              </Container>
                // <div>
                // <form id="newProductForm" onSubmit={handleSubmit}>
                // <div>
                //     <label htmlFor="product_name">Product Name:</label>
                //     <input type="text" name="product_name" id="product_name"  value={name} onChange={e=>setName(e.target.value)}/>
                // </div>
                
                // <div>
                //     <label htmlFor="product_description">Description:</label>
                //     <input type="text" name="product_description" id="product_description"  value={descriptionText} onChange={e=>descriptionText(e.target.value)}/>
                // </div>
  
                // <div>
                //     <label htmlFor="product_price">Price</label>
                //     <input type="number" name="product_price" id="product_price" value={price} onChange={e=>setPrice(e.target.value)} steps="0.01"/>
                // </div>
                
                // <div>
                //     <label htmlFor="product_media_url">ImageUrl:</label>
                //     <input type="text" name="product_media_url" id="product_media_url"value={mediaUrl} onChange={e=>setMediaUrl(e.target.value)} />
                // </div>
                // <input type="submit" value="Edit"/>
                // </form>
                // </div>
            )}
        </div>
        </div>
    )
}
export default EditProduct

