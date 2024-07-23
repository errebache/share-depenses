import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context';
import { isNotEmpty } from '../utils/helpers';

function AuthGuard({ children }) {
    const { user, isLoading, error } = useContext(AuthContext);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <Navigate to="/error" />;
    }

    if (!isNotEmpty(user)) {
        return <Navigate to="/login" />;
    }

    console.log(user);

    return children;
}

export default AuthGuard;
