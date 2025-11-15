import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Games from "./pages/games/Games";
import AddGame from "./pages/addgame/AddGame";
import Reviews from "./pages/reviews/Reviews";
import AddReview from "./pages/addreview/AddReview";
import EditGame from "./pages/editgame/EditGame";
import EditReview from "./pages/editreview/EditReview";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/add-game" element={<AddGame />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/add-review" element={<AddReview />} />
          <Route path="/edit-game/:id" element={<EditGame />} />
          <Route path="/edit-review/:id" element={<EditReview />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
