import "./GameCard.css";
import { deleteGame } from "../../services/gameService";
import { useNavigate } from "react-router-dom";
function GameCard({ game, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm(`¿Seguro que deseas eliminar "${game.titulo}"?`)) {
      try {
        await deleteGame(game._id);
        alert("Juego y reseñas eliminados correctamente");
        if (onDelete) onDelete(game._id);
      } catch (error) {
        console.error("Error al eliminar el juego:", error);
        alert("No se pudo eliminar el juego");
      }
    }
  };
  const navigate = useNavigate();
  return (
    <div className="game-card">
      <div
        className="game-cover-bg"
        style={{
          backgroundImage: `url(${
            game.imagenPortada ||
            "https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
          })`,
        }}
        role="img"
        aria-label={game.titulo}
      />
      <div className="game-details">
        <h3>{game.titulo}</h3>
        <p className="genre">{game.genero}</p>
        <p><strong>Plataforma:</strong> {game.plataforma}</p>
        <p><strong>Año:</strong> {game.añoLanzamiento}</p>
        <p><strong>Desarrollador:</strong> {game.desarrollador}</p>
        <p className="description">{game.descripcion}</p>
        <div className="status">
          {game.completado ? (
            <span className="badge completed">✅ Completado</span>
          ) : (
            <span className="badge pending">🎯 Pendiente</span>
          )}
        </div>
        <button
      className="edit-btn"
      onClick={() => navigate(`/edit-game/${game._id}`)}
    >
      ✏️ Editar
    </button>
        <button className="delete-btn" onClick={handleDelete}>
          🗑️ Eliminar juego
        </button>

      </div>
    </div>
  );
}

export default GameCard;
