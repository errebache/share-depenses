import { API_EXPENSES } from "./apis";

export const addExpense = async (idList, expenseData) => {
    try {
      const response = await fetch(API_EXPENSES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez d'autres en-têtes si nécessaire, comme le jeton d'authentification
        },
        body: JSON.stringify(expenseData), // Convertit les données de dépense en JSON
      });
  
      if (!response.ok) {
        // Gérer les erreurs de réponse HTTP
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add expense');
      }
  
      // La dépense a été ajoutée avec succès
      const responseData = await response.json();
      return responseData; // Renvoie les données de la nouvelle dépense ajoutée
    } catch (error) {
      // Gérer les erreurs de requête ou de réponse
      console.error('Error adding expense:', error);
      throw new Error('Failed to add expense');
    }
  };
  