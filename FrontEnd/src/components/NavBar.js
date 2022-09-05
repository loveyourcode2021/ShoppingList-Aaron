import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css'
import { recognition } from "../components/API/voice/voiceconginition.js";
import { useNavigate } from "react-router-dom";


function NavBar(props) {
  const { currentUser, onSignOut } = props
  const [stopReco, setStopReco] = useState(false);
  const listeningRef = useRef(false);
  const navigate = useNavigate();
  recognition.continuous = true;
  const handleVoiceResult = (event) => {


    const command = event.results[event.results.length - 1][0].transcript;
    console.log(command)
    if (!listeningRef.current && command.includes("start react")) {
      listeningRef.current = true;
    } else if (listeningRef.current) {
      if (command.includes("go to")) {
        if (command.includes("home")) {
          navigate("/")
        } else if (
          command.includes("new product")
        ) {
          navigate("/products/new")
        } else if (

          command.includes("product")
        ) {
          navigate("/products")
        } else if (
          command.includes("sign in")
        ) {
          navigate("/signin")
        } else if (command.includes("sign up")) {
          navigate("/signup")
        }else if (command.includes("sign out")) {
          navigate("/signout")
        }
      } else if (
        command.includes("stop listening")
      ) {
        listeningRef.current = false;
      }
    }
    console.log(listeningRef.current )
  }

  useEffect(() => {
    recognition.addEventListener('result', handleVoiceResult)
    return () => {
      recognition.removeEventListener('result', handleVoiceResult)
    }
  }, [])



  if (recognition !== null) {
    recognition.onresult = (event) => {
    }
  }


  return (
    <>
      <nav className='navbar'>
        <ul className='navbar__menu'>
          <li><NavLink className='nav__item' to='/'> Home</NavLink></li>
          <li><NavLink className='nav__item' to='/products/index'> Products</NavLink></li>
          <li><NavLink className='nav__item' to='/products/new'> NewProduct</NavLink></li>
        </ul>
        <ul className='navbar__sign'>
          {!!currentUser ?
            (<>
              <span className='welcome'> Welcome User: {currentUser}</span>
              <li>
                <a href="/signout" onClick={onSignOut} className="nav__item">Sign Out</a>
              </li>
            </>
            ) :
            (<>
              <li><NavLink className='nav__item sign' to='/signin'>Sign In</NavLink></li>
              <li><NavLink className='nav__item sign' to='/signup'>Sign Up</NavLink></li>
            </>
            )}
        </ul>
      </nav>
    </>
  );
}

export default NavBar
