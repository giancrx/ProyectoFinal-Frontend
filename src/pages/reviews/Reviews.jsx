import { useEffect, useState } from "react";
import { getReviews } from "../../services/reviewService";
import ReviewCard from "../../components/reviewcard/ReviewCard";
import ClipLoader from "react-spinners/ClipLoader";
import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDeleteReview = (deletedId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((r) => r._id !== deletedId)
    );
  };

  return (
    <div>
      <h2>⭐ Reseñas de Videojuegos</h2>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <ClipLoader size={50} color="#4fa94d" />
        </div>
      ) : reviews.length === 0 ? (
        <p>No hay reseñas registradas aún.</p>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onDelete={() => handleDeleteReview(review._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;
