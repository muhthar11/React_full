import React from 'react';
import { Navigate } from 'react-router-dom'

function protuctedRoute(props) {
    if(localStorage.getItem("token")){
        return props.children
    }else{
        return <Navigate to="/"/>;
    }
}

export default protuctedRoute