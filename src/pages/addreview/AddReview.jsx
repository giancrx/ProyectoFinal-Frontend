import { useState, useEffect } from "react";
import { createReview } from "../../services/reviewService";
import { getGames } from "../../services/gameService";
import "./AddReview.css";

function AddReview() {
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    juegoId: "",
    puntuacion: 3,
    textoReseña: "",
    horasJugadas: "",
    dificultad: "Normal",
    recomendaria: false,
  });

  // Cargar los juegos al montar el componente
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error("Error al cargar los juegos:", error);
      }
    };
    fetchGames();
  }, []);

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
      await createReview(formData);
      alert("Reseña agregada exitosamente!");
      setFormData({
        juegoId: "",
        puntuacion: 3,
        textoReseña: "",
        horasJugadas: "",
        dificultad: "Normal",
        recomendaria: false,
      });
    } catch (error) {
      console.error("Error al guardar la reseña:", error);
      alert("Error al guardar la reseña");
    }
  };

  return (
    <div className="add-review-container">
      <h2>Agregar nueva reseña</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Selector de juegos */}
        <label>
          Selecciona un juego:
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

        <button type="submit">Guardar reseña</button>
      </form>
    </div>
  );
}

export default AddReview;
