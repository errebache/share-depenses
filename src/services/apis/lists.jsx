import { API_LIST } from "./apis";


// export async function AddList() {
//   const response = await fetch(API_LIST.ADD, { method: 'POST' });
//   return await handleResponse(response);
// }

export async function addList(listData){
  try {
    console.log(API_LIST.ADD)
    const response = await fetch(API_LIST.ADD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to add list');
    }
  } catch (error) {
    console.error('Error adding list:', error);
    throw error;
  }
};

export async function getListByUserId(userId) {
  try {
    const response = await fetch(`${API_LIST.BASE}/${userId}`);
    const body = await response.json();
    console.log(body);
    if (!response.ok) {
      const error = body?.message || "Oops une erreur est survenue";
      throw new Error(error);
    }
    console.log('%c Lists','color:red,font-size:22px')
    return body;

  } catch (error) {
    console.error("Probleme au niveau de lists", error.message);
    throw error;
  }
}

export async function getListDetail(userId) {
    try {
      const response = await fetch(`${API_LIST.BASE}/${userId}/detail`);
      const body = await response.json();
  
      if (!response.ok) {
        const error = body?.message || "Oops une erreur est survenue";
        throw new Error(error);
      }
      console.log('%c Lists','color:red,font-size:22px')
      return body;
  
    } catch (error) {
      console.error("Probleme au niveau de lists", error.message);
      throw error;
    }
  }

export async function deleteList(listId) {
    try {
      const response = await fetch(`${API_LIST.BASE}/${listId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if(!response.ok){
        throw new Error("Impossible de supprimer la liste")
      }
      return true;
    } catch (error) {
      console.error("Erreur lors de la supression de la listes", error.message);
      throw error;
    }
  }