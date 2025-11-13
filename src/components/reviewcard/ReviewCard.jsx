import "./ReviewCard.css";
import { deleteReview } from "../../services/reviewService";
import { useNavigate } from "react-router-dom";

function ReviewCard({ review, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm("¿Seguro que deseas eliminar esta reseña?")) {
      try {
        await deleteReview(review._id);
        alert("Reseña eliminada correctamente");
        if (onDelete) onDelete(); // actualiza la lista si se pasa la función
      } catch (error) {
        console.error("Error al eliminar la reseña:", error);
        alert("No se pudo eliminar la reseña");
      }
    }
  };
  const navigate = useNavigate();
  
  return (
    <div className="review-card">
      <h3>{review.juegoId?.titulo || "Juego desconocido"}</h3>
      <p>⭐ {review.puntuacion} / 5</p>
      <p>{review.textoReseña}</p>
      {review.horasJugadas && <p>⏱️ {review.horasJugadas} horas jugadas</p>}
      <p>Dificultad: {review.dificultad}</p>
      <p>{review.recomendaria ? "✅ Recomendado" : "🚫 No recomendado"}</p>

      <button onClick={() => navigate(`/edit-review/${review._id}`)}>
        ✏️ Editar
      </button>
      <button className="delete-btn" onClick={handleDelete}>
        Eliminar reseña
      </button>
    </div>
  );
}

export default ReviewCard;
