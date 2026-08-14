import { Routes, Route } from "react-router";
import MoviePage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MoviesPage";

const App = () => {
  return (
    <div className="d-flex flex-column bg-dark text-white min-vh-100">
      <header className="text-center py-3">
        <div className="container border rounded border-success">
          <h1>Movie App</h1>
        </div>
      </header>

      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<MoviePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
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
