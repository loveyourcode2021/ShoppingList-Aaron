import './App.css';
import React, { useState, useEffect } from 'react';
import { User } from "./requests"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import NavBar from './components/NavBar';
import Home from './components/Home';
//login pages
import { SignInPage } from './components/shared/SignInPage';
import { SignUpPage } from './components/shared/SignUpPage';

//ProductPage
import MainProducts from './components/products/Products';
import NewProduct from './components/products/NewProduct';
import ShowProduct from './components/products/ShowProduct';
import IndexProduct from './components/products/IndexProduct';
import EditProduct from './components/products/EditProduct';
import DeleteProduct from './components/products/DeleteProduct';
import SingleProduct from './components/products/SingleProduct';
import { useScrollTrigger } from '@mui/material';


function App() {

  const [user, setUser] = useState(undefined)

  const getCookieValue = (name) => {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  }

  function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  const setCurrentUser = (data) => {
    const endOfDay = new Date().setHours(23, 59, 59, 999)
    const expiry = new Date(endOfDay).toUTCString();
    document.cookie = `email=${data.user.email}; expires=${expiry}; path=/;`
    setUser(getCookieValue('email'));
  }

  const getCurrentUser = () => {
    const userCookie = getCookieValue('email')
    console.log(userCookie)
    if (userCookie) {
      setUser(userCookie)
    } else {
      setUser(undefined)
    }
  }

  const handleSignOut = () => {
    const instantExpiry = new Date().toUTCString();
    delete_cookie("email")
    setUser(undefined);
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <BrowserRouter basename='/amazonanalyzer'>
      <NavBar handleSignOut={handleSignOut} currentUser={user} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignInPage onSignIn={setCurrentUser} />} />
        <Route path="signup" element={<SignUpPage onSignUp={setCurrentUser} />} />
        <Route path="products" element={<MainProducts currentUser={getCurrentUser} />}>
          <Route path="index" element={<IndexProduct />} />
          <Route path="new" element={<NewProduct />} />
          <Route path=":id" element={< SingleProduct />} >
            <Route index element={<ShowProduct />} >
            </Route>
            <Route path="edit" element={<EditProduct />} />
            <Route path="delete" element={<DeleteProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
