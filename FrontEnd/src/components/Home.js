import React, { useEffect } from 'react'
import Camera from "./API/face/camera"
const Home = () => {
  useEffect(() => {
    console.log("Home")
  }, [])
  return (
    <>
     
      <Camera></Camera>
    </>
  )
}

export default Home

