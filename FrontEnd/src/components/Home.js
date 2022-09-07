import React, { useEffect } from 'react'
import Camera from "./API/face/camera"
import { SayButton } from 'react-say';

const Home = () => {
  useEffect(() => {
    console.log("Home")
  }, [])
  return (
    <>
      {/* <SayButton
        speak={"test utterance"}>Click</SayButton> */}
    
      <Camera></Camera>
    </>
  )
}

export default Home

