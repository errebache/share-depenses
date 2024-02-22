import { useLoaderData } from "react-router-dom";
import { login, logout  } from "../../services/apis/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from 'react-router-dom';

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const initiateUser = useLoaderData();
    const [user, setUser] = useState(initiateUser);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true)
        try {
            const storeUser = localStorage.getItem('user');
            const  userFromServer = JSON.parse(storeUser || null);
            console.log(storeUser);
            if (userFromServer) {
                setUser(userFromServer);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
       
    }, []);

    async function signin(credentials) {
        setIsLoading(true);
        try {
            const newUser = await login(credentials);
            localStorage.setItem("user", JSON.stringify(newUser));
            navigate("/lists");
            setUser(newUser);
            // localStorage.setItem('user',newUser);
        } catch (error) {
            console.error("Error signing in: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function signout() {
        setIsLoading(true);
        try {
            await logout();
            localStorage.removeItem( 'user' );
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.log("Error signing out: ", error);
        } finally {
            setIsLoading(false);
        }
   
    }

    return (
        <AuthContext.Provider value={{
                user: user ? user : null,
                setUser: setUser,
                signin: signin,
                signout: signout,
                isLoading: isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;