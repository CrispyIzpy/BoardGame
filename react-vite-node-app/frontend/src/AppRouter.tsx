// AppRouter.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Board";
import AuthPage from "./Pages/AuthPage";
import NavBar from "./components/NavBar";

export default function AppRouter() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}
