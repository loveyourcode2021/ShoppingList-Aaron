import React, { useState, useEffect, useRef } from 'react';
import { Reviews } from "../../requests";
import StarsRating from 'stars-rating'
import uniqid from 'uniqid';
import { useNavigate, useParams } from "react-router-dom";
import TextSetntient from '../API/sentiment/Text_Sentiment';
import ShowReview from "./ShowReview"
import { async } from '@firebase/util';
import { generateReviewDateString } from '../../utilities/utils';


/**mui library */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';



const NewProduct = ({ srcLink }) => {
    const params = useParams();

    const [isLoading, setLoading] = useState(true)
    const [rating, setRating] = useState(null)
    const [scraps, setScraps] = useState(null)
    const [sentimentalWords, setSetmentalWords] = useState(null)
    const pid = params.id

    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();
        // do cool stuff here
        const formData = new FormData(currentTarget)
        const currentDate = new Date()
        const createdAt = generateReviewDateString(currentDate)
        const newReviewData = {
            "review_id": uniqid.time(),
            "product_id": params.id,
            "title": formData.get("title"),
            "rating": rating,
            "review_body": formData.get("review_body"),
            "createdAt": createdAt
        }
        console.log(newReviewData)
        //it works
        Reviews.create(newReviewData, params.id)
            .then(resData => {
                setScraps(prevState => {
                    const newScraps = [resData, ...prevState];
                    return newScraps;
                })
            })


    }
    useEffect(() => {
        console.log("amazon>>>", srcLink)
        console.log("newReview Called?")
        console.log("Amazon Scraping started")
        const productData = {
            "url": srcLink,
            "product_id": pid
        }
        Reviews.test(productData).then((res) => {
            setScraps(res)
            console.log("amazon", res)
            const sentimentWords = []
            res.forEach((element) => {
                sentimentWords.push((element.title + element.review_body).trim())
            })
            setSetmentalWords(sentimentWords.join(""))
            setLoading(false)
        })
    }, [])


    return (
        <>
            <div className='reviews'>

                <div className='reviews-sentiment'>
                    {isLoading && <h3>Review List is Loadings</h3>}
                    {!isLoading && sentimentalWords && (
                        <TextSetntient sentimentalWords={sentimentalWords}></TextSetntient>
                    )}
                </div>
                <div className='new-review'>
                    <h2>this is a new Review!</h2>
                    <Box id="newProductForm" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <StarsRating
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            color2={'#ffd700'} />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Tile"
                            name="title"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="review_body"
                            label="review_body"
                            type="review_body"
                            id="review_body"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit Review
                        </Button>

                    </Box>

                </div>
                <div>
                    {isLoading ? (<h3>Review List is Loadings</h3>) :
                        (
                            <ShowReview scrap_list={scraps} />
                        )}
                </div>
            </div>
        </>


    )
}

export default NewProduct
