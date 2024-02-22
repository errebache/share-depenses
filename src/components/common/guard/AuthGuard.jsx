import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context';

function AuthGuard({ children }) {
    const { user, isLoading, error } = useContext(AuthContext);
    
    // Affichage d'un composant de chargement pendant la vérification de l'authentification
    if (isLoading) {
        return <div>Loading...</div>; // Ou un composant de chargement spécifique
    }

    // Redirection vers une page d'erreur ou affichage d'un message en cas d'erreur d'authentification
    if (error) {
        // Vous pouvez remplacer '/error' par votre route d'erreur spécifique
        return <Navigate to="/error" />;
    }

    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de login
    // tout en conservant la route actuelle pour une redirection ultérieure après authentification
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Si l'utilisateur est authentifié, afficher le composant enfant protégé
    return children;
}

export default AuthGuard;
