
const API_AUTH = "/api/users";


export async function forgotPassword(email) {
  try {
    const response = await fetch(`${API_AUTH}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const body = await response.json();

    if (!response.ok) {
      const error = body?.message || "Oops une erreur est survenue";
      throw new Error(error);
    }

    return body;

  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation du mot de passe:", error.message);
    throw error;
  }
}


export async function resetPasswordAPI(password, userId, token) {
  try {
    const response = await fetch(`${API_AUTH}/reset-password/${userId}/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const body = await response.json();

    if (!response.ok) {
      const error = body?.message || "Une erreur est survenue lors de la réinitialisation du mot de passe";
      throw new Error(error);
    }

    return body;

  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error.message);
    throw error;
  }
}
