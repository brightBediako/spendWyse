import React, { Children } from 'react'
import { getUserFromStorage } from '../../utils/getUserFromStorage'
import { Navigate } from 'react-router-dom';



const AuthRoute = ({ children }) => {
    const token = getUserFromStorage();
    if (token) {
        return children;
    } else {
        // window.location.href = '/login';
        return <Navigate to="/login" />;
    }
}

export default AuthRoute