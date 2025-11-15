const API_URL = "https://proyectofinal-backend-feq9.onrender.com/api/reviews";

// Obtener todas las reseñas
export const getReviews = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener las reseñas");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Crear una reseña nueva
export const createReview = async (reviewData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error("Error al crear la reseña");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Actualizar reseña existente
export const updateReview = async (id, reviewData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error("Error al actualizar la reseña");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar reseña
export const deleteReview = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar la reseña");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
