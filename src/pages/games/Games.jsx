import { useEffect, useState } from "react";
import { getGames } from "../../services/gameService";
import GameCard from "../../components/gamecard/GameCard";

function Games() {
  const [games, setGames] = useState([]);

  // Cargar juegos
  const fetchGames = async () => {
    const data = await getGames();
    setGames(data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Quitar juego eliminado del estado
  const handleDeleteGame = (deletedId) => {
    setGames((prevGames) => prevGames.filter((g) => g._id !== deletedId));
  };

  return (
    <div>
      <h2>🎮 Lista de Videojuegos</h2>
      {games.length === 0 ? (
        <p>No hay juegos registrados aún.</p>
      ) : (
        <div className="games-grid">
          {games.map((game) => (
            <GameCard key={game._id} game={game} onDelete={handleDeleteGame} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Games;
