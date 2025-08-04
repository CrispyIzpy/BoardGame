// AppRouter.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Board";
import AuthPage from "./Pages/AuthPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}
