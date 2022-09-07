import React, { useState, useEffect, useRef } from 'react';
import { Reviews } from "../../requests";
import StarsRating from 'stars-rating'
import uniqid from 'uniqid';
import { useNavigate, useParams } from "react-router-dom";
import TextSetntient from '../API/sentiment/Text_Sentiment';
import ShowReview from "./ShowReview"
import { async } from '@firebase/util';
import { generateReviewDateString } from '../../utilities/utils';

const NewProduct = ({ srcLink }) => {
    const [review_list, setReviewsList] = useState([])
    const params = useParams();
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(true)
    const [rating, setRating] = useState(null)
    const [scraps, setScraps] = useState(null)
    const [sentimentalWords, setSetmentalWords] = useState(null)
    const pid = params.id
    const inputRef = useRef([]);

    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    const handleSubmit = (event) => {
        const { currentTarget } = event;
        event.preventDefault();
        // do cool stuff here
        const formData = new FormData(currentTarget)
        setReviewsList([])

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
        Reviews.getScrap(productData).then(async (res) => {
            await setScraps(res)
            console.log("amazon", res)
            if (!!res) {
                await res.map((element, index) => {
                    inputRef.current[index] = (element.title + element.review_body).trim()
                })
                await setSetmentalWords(inputRef.current.join(""))

            }

            setLoading(false)
        })



    }, [])


    return (
        <>
            <div className='reviews'>

                <div className='reviews-sentiment'>
                    {isLoading ? (<h3>Review List is Loadings</h3>) :
                        (
                            <TextSetntient sentimentalWords={!!sentimentalWords ? sentimentalWords : "Hello how are you"}></TextSetntient>
                        )}
                </div>
                <div className='new-review'>
                    <h2>this is a new Review!</h2>
                    <form id="newProductForm" onSubmit={handleSubmit}>
                        <div>
                            <StarsRating
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                color2={'#ffd700'} />
                        </div>


                        <div>
                            <label htmlFor="title">Title:</label>
                            <input type="text" name="title" id="title" />
                        </div>


                        <div>
                            <label htmlFor="review_body">Review:</label>
                            <textarea rows={4} cols={50} name="review_body" id="review_body" />
                        </div>
                        <input type="submit" />
                    </form>
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
