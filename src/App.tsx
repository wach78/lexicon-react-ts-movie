import { Routes, Route, useNavigate } from "react-router";
import MoviePage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import LoginPage from "./pages/LoginPage";
import { logout } from "../src/services/AuthService";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column bg-dark text-white min-vh-100">
      <header className="text-center py-3">
        <div className="container border rounded border-success">
          <h1>Movie App</h1>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MoviePage />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
          </Route>
        </Routes>
      </main>

      <footer className="bg-dark text-white py-3 mt-5 text-center">
        <div className="container">
          <p className="mb-0">Movie App</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
