import React, {useState, useEffect} from "react"
import Sentiment from "sentiment"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const TextSetntient = ({sentimentalWords}) =>{
    const sentiment = new Sentiment();
    const [sentimentScore, setSentimentScore] = useState(0)

    const [emjoi, setEmoji] = useState("😐")
    const findSentiment = (words) => {
        const result = sentiment.analyze(words)
        const score = result.score
        if (score === 0){
            setEmoji("😐")
        }else if(score > 0){
            if(score>=100){
                setEmoji('🤩')
            }else if(score >= 50 && score<100){
                setEmoji('🥰')
            }else if(score>= 0 && score < 50){
                setEmoji('😍')
            } 
        
            
        }else if(score<0){
            if(score<0 ){
                setEmoji('😠')

            } 
        }
        
      
        setSentimentScore(score)
    
        console.log( "sentimental score is >>>>>>>", score)
    }
    useEffect(()=>{
        setEmoji("😐")
        findSentiment(sentimentalWords)
    },[])
    return (
        <>
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
 
          <Typography component="h1" variant="h3">
                 <span role="img" aria-label="neutral face">
                           {emjoi}
                </span>
          </Typography>
          <Typography component="h1" variant="h3">
                 <span  aria-label="neutral face">
                    Sentiment Score: {sentimentScore} 
                 </span>
          </Typography>
       
        
        </Box>
      </Container>
      </>
    )   
}
export default TextSetntient