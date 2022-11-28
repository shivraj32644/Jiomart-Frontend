// import React from 'react'

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({children}) => {
    let {token,isAuth} = useSelector(state=>state.auth)
    let user_id = localStorage.getItem("user_id");
   let navigate  = useNavigate();
   useEffect(()=>{
    if(user_id==null || user_id==undefined || user_id==""){
        navigate('/account/login');
        return
   }
   },)
  
    return children
}