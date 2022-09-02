
import './App.css';
import React, { useState, useEffect } from 'react';
import { User } from "./requests"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from "axios"

import NavBar from './components/NavBar';
import Home from './components/Home';
//login pages
import { SignInPage } from './components/shared/SignInPage';
import { SignUpPage } from './components/shared/SignUpPage';

//ProductPage
import MainProducts from './components/products/Products';
import NewProduct from './components/products/NewProduct';
import  ShowProduct  from './components/products/ShowProduct';
import  IndexProduct  from './components/products/IndexProduct';
import  EditProduct  from './components/products/EditProduct';
import  DeleteProduct  from './components/products/DeleteProduct';
import SingleProduct from './components/products/SingleProduct';


//ReviewPage
import MainReviews from './components/Reviews/MainReviews'
import ShowReview from './components/Reviews/ShowReview'
import NewReview from './components/Reviews/NewReview'

//YoutubeApi stuff for fun
import Search from './components/youtube/Search'
import youtubeApi from './components/youtube/YouTubeApi'


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  //---youtube stuff starts---
  const [videoMetaInfo, setVideoMetaInfo] = useState([])
  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const onSearch  = async keyword => {
    const response = await youtubeApi.get('/search',{
      params:{
        q:keyword
      }
    })
    console.log(response)
  }
 //---youtube stuff ends---

  useEffect(() => {
    getCurrentUser()
  }, [])
  const getCurrentUser = () => {
    return User.current().then(user => {
      console.log("---App.js---start USEREFFECT")
      console.log(user.data)
      !!user.data ? setCurrentUser(user.data.email) : setCurrentUser(undefined)
      console.log("---App.js---END USEREFFECT")
    }).catch(e =>
      console.log(e))
  }
  const onSignOut = () => { User.destroy() }
  return (
    <BrowserRouter>
      <NavBar currentUser={currentUser} onSignOut={onSignOut} />
      <Routes>
  
        <Route index element={<Home />} /> 
        <Route path="signin" element={<SignInPage onSignIn={getCurrentUser} />} />
        <Route path="signup" element={<SignUpPage onSignUp={getCurrentUser} />} />
        <Route path="products" element={<MainProducts />}>
            <Route path="index" element={<IndexProduct />} />
            <Route path="new" element={<NewProduct />} />
            <Route path=":id" element={< SingleProduct/>} >
              <Route index element={<ShowProduct />} >
                  
              </Route>
              <Route path="edit" element={<EditProduct />} />
              <Route path="delete" element={<DeleteProduct />} />
          </Route>
        </Route>
        <Route path="youtube" element={<Search onSearch={onSearch}/>} /> 
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
