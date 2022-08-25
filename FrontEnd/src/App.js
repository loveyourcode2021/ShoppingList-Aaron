
import './App.css';
import React, { useState, useEffect } from 'react';
import { User } from "./requests"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';

import { SignInPage } from './components/shared/SignInPage';
import { SignUpPage } from './components/shared/SignUpPage';
import Products from './components/products/Products';
import NewProduct from './components/products/NewProduct';

const ParentComponent = ({ children }) => {
  return (
    <div>
      <h1>I am parent</h1>
      {children}
    </div>
  )
}

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // todo replace with getCurrentUser
    setCurrentUser(undefined)
  }, [])
  const getCurrentUser = () => {
    return User.current().then(user => {
      console.log("---App.js---start USEREFFECT")
      console.log(user.data)
      !!user.data ? setCurrentUser(user) : setCurrentUser(undefined)
      console.log(user.data)
      console.log("---App.js---start USEREFFECT")
      console.log(user.data.email)
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
        <Route path="products" element={<Products />}>
          <Route path="new" element={<NewProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
