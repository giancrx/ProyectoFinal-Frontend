// src/pages/EditReview/EditReview.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReviews, updateReview } from "../../services/reviewService";
import { getGames } from "../../services/gameService";
import "./EditReview.css";

function EditReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    juegoId: "",
    puntuacion: 3,
    textoReseña: "",
    horasJugadas: "",
    dificultad: "Normal",
    recomendaria: false,
  });

  // Cargar los juegos y la reseña actual
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesData, reviewsData] = await Promise.all([
          getGames(),
          getReviews(),
        ]);
        setGames(gamesData);
        const review = reviewsData.find((r) => r._id === id);
        if (review) {
          setFormData({
            juegoId: review.juegoId?._id || "",
            puntuacion: review.puntuacion,
            textoReseña: review.textoReseña,
            horasJugadas: review.horasJugadas,
            dificultad: review.dificultad,
            recomendaria: review.recomendaria,
          });
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReview(id, formData);
      alert("Reseña actualizada exitosamente!");
      navigate("/reviews");
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
      alert("Error al actualizar la reseña");
    }
  };

  return (
    <div className="edit-review-container">
      <h2>Editar Reseña</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Juego:
          <select
            name="juegoId"
            value={formData.juegoId}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona un juego --</option>
            {games.map((game) => (
              <option key={game._id} value={game._id}>
                {game.titulo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Puntuación (1-5):
          <input
            type="number"
            name="puntuacion"
            min="1"
            max="5"
            value={formData.puntuacion}
            onChange={handleChange}
            required
          />
        </label>

        <textarea
          name="textoReseña"
          placeholder="Escribe tu reseña..."
          value={formData.textoReseña}
          onChange={handleChange}
        />

        <input
          type="number"
          name="horasJugadas"
          placeholder="Horas jugadas"
          value={formData.horasJugadas}
          onChange={handleChange}
        />

        <label>
          Dificultad:
          <select
            name="dificultad"
            value={formData.dificultad}
            onChange={handleChange}
          >
            <option value="Fácil">Fácil</option>
            <option value="Normal">Normal</option>
            <option value="Difícil">Difícil</option>
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            name="recomendaria"
            checked={formData.recomendaria}
            onChange={handleChange}
          />
          ¿Lo recomendarías?
        </label>

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default EditReview;
