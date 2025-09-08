// AppRouter.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import BoardGameMatchmake from "./Pages/BoardGameMatchmake";
import BoardGame from "./Pages/Board";
import AuthPage from "./Pages/AuthPage";
import NavBar from "./components/NavBar";
import AboutPage from "./Pages/AboutPage";

export default function AppRouter() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board_game" element={<BoardGameMatchmake />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}
