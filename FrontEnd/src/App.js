
import './App.css';
import React, { useState, useEffect } from 'react';
import { User } from "./requests"
import { BrowserRouter, Routes, Route ,  Navigate } from "react-router-dom";


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








import { recognition } from "./components/API/voice/voiceconginition";
function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [stopReco, setStopReco] = useState(false);




 useEffect(() => {
    getCurrentUser()
  }, [])
  
  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    if (command.includes("go to")) {
      if (command.includes("home")) {
        <Navigate to="/" />
      } else if (
        command.includes("new products")
      ) {
        <Navigate to="/products/new" />

      }else if (

        command.includes("products")
      ) {
        <Navigate to="/products" />
      }  else if (
        command.includes("signin")
      ) {
        <Navigate to="/signin" />
      } else if (command.includes("signout") ) {
        <Navigate to="/signout" />
      }
    } else if (
      command.includes("stop listening")
    ){
      recognition.stop();
      setStopReco(true);
    }
  }

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
