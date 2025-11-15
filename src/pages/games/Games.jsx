import { useEffect, useState } from "react";
import { getGames } from "../../services/gameService";
import GameCard from "../../components/gamecard/GameCard";
import ClipLoader from "react-spinners/ClipLoader";

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    const data = await getGames();
    setGames(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDeleteGame = (deletedId) => {
    setGames((prevGames) => prevGames.filter((g) => g._id !== deletedId));
  };

  return (
    <div>
      <h2>🎮 Lista de Videojuegos</h2>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <ClipLoader size={40} />
        </div>
      ) : games.length === 0 ? (
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
