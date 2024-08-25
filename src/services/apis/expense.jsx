import { API_EXPENSES } from "./apis";

export const addExpense = async (expenseData, imageFile, splitAmong) => {
  const formData = new FormData();

  // Append regular fields to the FormData
  for (const key in expenseData) {
    formData.append(key, expenseData[key]);
  }
  
  if (splitAmong && Array.isArray(splitAmong)) {
    formData.append('splitAmong', JSON.stringify(splitAmong));
  } else {
    console.error('splitAmong must be an array');
    throw new Error('Invalid splitAmong data');
  }

  // Append the image file if provided
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    // Make the POST request with the FormData
    const response = await fetch(API_EXPENSES, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add expense");
    }

    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error("Error adding expense:", error);
    throw new Error("Failed to add expense");
  }
};
