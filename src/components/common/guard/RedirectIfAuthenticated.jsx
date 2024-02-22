import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context'; 

function RedirectIfAuthenticated({ children }) {
    const { user } = useContext(AuthContext);

    return user ? <Navigate to="/lists" /> : children;
}


export default RedirectIfAuthenticated;