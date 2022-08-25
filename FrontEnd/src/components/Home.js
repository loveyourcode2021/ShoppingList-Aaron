import React, { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    console.log("Home")
  }, [])
  return (
    <>
      <div>This is HOME Page</div>
    </>
  )
}

export default Home

