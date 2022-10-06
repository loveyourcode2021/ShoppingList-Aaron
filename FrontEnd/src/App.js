import './App.css';
import React, { useState, useEffect } from 'react';
import { User } from "./requests"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import NavBar from './components/NavBar';
import Home from './components/Home';
//login pages
import { SignInPage } from './components/shared/SignInPage';
import { SignUpPage } from './components/shared/SignUpPage';
import {ProtectedAuth} from './components/shared/ProtectedAuth'
//ProductPage
import MainProducts from './components/products/Products';
import NewProduct from './components/products/NewProduct';
import ShowProduct from './components/products/ShowProduct';
import IndexProduct from './components/products/IndexProduct';
import EditProduct from './components/products/EditProduct';
import DeleteProduct from './components/products/DeleteProduct';
import SingleProduct from './components/products/SingleProduct';
import { useScrollTrigger } from '@mui/material';

import {getCookieValue, delete_cookie, setCurrentUser,getCurrentUser } from './utilities/utils'

function App() {

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <BrowserRouter basename='/amazonanalyzer'>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignInPage onSignIn={setCurrentUser} />} />
        <Route path="signup" element={<SignUpPage onSignUp={setCurrentUser} />} />
        <Route path="products" element={<MainProducts/>}>
          <Route path="index" element={<ProtectedAuth><IndexProduct /></ProtectedAuth>} />
          <Route path="new" element={<ProtectedAuth><NewProduct /></ProtectedAuth>}/>
          <Route path=":id" element={< SingleProduct />} >
            <Route index element={<ShowProduct />} />
            <Route path="edit" element={<EditProduct />} />
            <Route path="delete" element={<DeleteProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
