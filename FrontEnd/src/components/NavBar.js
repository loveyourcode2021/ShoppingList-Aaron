import React from 'react';
import { User } from '../requests';
import { NavLink } from 'react-router-dom';


function NavBar(props) {
  const { currentUser, onSignOut } = props

  return (
    <>
      <nav>
        <NavLink to='/'> Home</NavLink>
        <NavLink to='/products'> Products</NavLink>
        <NavLink to='/products/new'> NewProduct</NavLink>

        {!!currentUser ?
          (
            <>

              <span>|| Welcome ||</span>
              <a href="/signout" onClick={onSignOut} className="menu-item">Sign Out</a>
            </>
          ) : (
            <>
            <NavLink to='/signin'> ||Sign In ||</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
            </>
          )}





      </nav>
    </>
  );
}

export default NavBar
