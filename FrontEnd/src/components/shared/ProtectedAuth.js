import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {getCookieValue, delete_cookie, setCurrentUser,getCurrentUser } from '../../utilities/utils'


 const ProtectedAuth = ({children}) => {
    const navigator = useNavigate();
    useEffect(()=>{
        const user = getCookieValue()
        console.log("protect auth", user, !user, !!user)
        if(!getCookieValue()){
            navigator('/signin')
        }
    },
    [])
  return children
}

export {ProtectedAuth}

