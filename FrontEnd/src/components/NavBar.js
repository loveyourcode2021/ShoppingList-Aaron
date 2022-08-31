import React from 'react';
import { User } from '../requests';
import { NavLink } from 'react-router-dom';
import './NavBar.css'


function NavBar(props) {
  const { currentUser, onSignOut } = props

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
