import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameById, updateGame } from "../../services/gameService";
import "./EditGame.css";

function EditGame() {
  const { id } = useParams(); // obtiene el id del juego desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    añoLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: "",
    completado: false,
  });

  const [loading, setLoading] = useState(true);

  // Cargar los datos del juego al montar el componente
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const game = await getGameById(id);
        setFormData(game);
        setLoading(false);
      } catch (error) {
        alert("Error al cargar el juego");
        navigate("/games");
      }
    };
    fetchGame();
  }, [id, navigate]);

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
      await updateGame(id, formData);
      alert("Juego actualizado correctamente ✅");
      navigate("/games"); // redirige a la lista de juegos
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el juego ❌");
    }
  };

  if (loading) return <p>Cargando datos del juego...</p>;

  return (
    <div className="edit-game-container">
      <h2>✏️ Editar Videojuego</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Título</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Género</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Plataforma</label>
        </div>

        <div className="form-group">
          <input
            type="number"
            name="añoLanzamiento"
            value={formData.añoLanzamiento}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Año de lanzamiento</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="desarrollador"
            value={formData.desarrollador}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Desarrollador</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="imagenPortada"
            value={formData.imagenPortada}
            onChange={handleChange}
            placeholder=" "
          />
          <label>URL de la portada</label>
        </div>

        <div className="form-group">
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Descripción</label>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="completado"
            checked={formData.completado}
            onChange={handleChange}
          />
          Completado
        </label>

        <button type="submit" className="save-btn">
          💾 Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default EditGame;
