import { Navigate } from "react-router-dom";
import { getCookie } from "../../components/common/utils/getCookies";

const API_AUTH = "/api/auth";

export async function login(credentials) {
  try {
    const response = await fetch(API_AUTH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const body = await response.json();

    if (response.ok) {
      // Connexion réussie, renvoyer les données utilisateur
      return body;
    } else {
      // La requête a échoué mais a renvoyé des données explicatives
      return null;
    }
  } catch (error) {
    console.error("Error during signin:", error);
    // Une erreur s'est produite pendant la requête
    return { success: false, user: null, error: "Oops une erreur est survenue" };
  }
}


export async function signup(credentials) {
  try {
    const response = await fetch(`${API_AUTH}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    
    const body = await response.json();
    if (response.ok && body.auth !== false) {
      return body;
    } else {
      if (body) {
        throw body;
      } else {
        throw new Error("Oops, une erreur est survenue");
      }
    }
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error(error.message);
    // Handle any errors that may occur during signup here
  }
}


export async function getCurrentUser() {
  try {
    const token = getCookie("token");
    if (!token) {
      return { success: false, user: null, error: "Token not found" };
    }

    const response = await fetch(`${API_AUTH}/current`);
    const body = await response.json();

    if (response.ok && body.auth !== false) {
      // Assurez-vous que la structure de body correspond à vos attentes
      console.log('Cureentnnnnnnnn');
      console.log({ success: true, user: body, error: null });
      return { success: true, user: body, error: null };
    } else if (body.auth === false) {
      return { success: false, user: null, error: "Authentication failed" };
    } else {
      // Corps de la réponse présent, mais une erreur s'est produite
      return { success: false, user: null, error: body.message || "An error occurred" };
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    // Retourne un objet d'erreur générique en cas d'exception
    return { success: false, user: null, error: "Oops une erreur est survenue" };
  }
}


export async function logout() {
  try {
    const response = await fetch(`${API_AUTH}/logout`, {
      method: "POST",
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
