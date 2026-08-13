import { useEffect, useState } from "react";
import type { MovieDto } from "./dtos/movie/MovieDto";
import MovieTable from "./components/movies/MovieTable";
import type { MovieCreateDto } from "./dtos/movie/MovieCreateDto";
import type { MovieUpdateDto } from "./dtos/movie/MovieUpdateDto";
import {
    createMovie,
    fetchMovies,
    updateMovie,
    deleteMovie
} from "./services/MovieService";

import MovieFormModal from "./components/movies/MovieFormModal";



function App() {
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDto | null>(null);

  useEffect(() => {
      const loadMovies = async () => {
          const data = await fetchMovies();
          setMovies(data);
      };

      loadMovies();
  }, []);

  const handleAdd = () => {
    setSelectedMovie(null);
    setShowMovieModal(true);
  };

  const handleEdit = (movie: MovieDto) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  const handleCloseModal = () => {
  setShowMovieModal(false);
  setSelectedMovie(null);
  };

  const handleDelete = async (id: string) => {
    await  deleteMovie(id);

    const updatedMovies = await fetchMovies();
    setMovies(updatedMovies);
  };

  const handleCreate = async (movie: MovieCreateDto) => {
    const createdMovie = await createMovie(movie);

    setMovies(currentMovies => [
        ...currentMovies,
        createdMovie
    ]);
};

const handleUpdate = async (
    id: string,
    movie: MovieUpdateDto
) => {
    await updateMovie(id, movie);

    const updatedMovies = await fetchMovies();
    setMovies(updatedMovies);
};

  return (
      <div className="d-flex flex-column bg-dark text-white min-vh-100">
          <header className="text-center py-3">
              <div className="container border rounded border-success">
                  <h1>Movie App</h1>
              </div>
          </header>

          <main className="container my-4 text-center flex-grow-1">
              <section className="border rounded border-success p-3">
                  <h2>Movies</h2>

                  <button
                    type="button"
                    className="btn btn-success mb-3"
                    onClick={handleAdd}
                >
                    Add Movie
                </button>

                  <MovieTable
                      movies={movies}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                  />
              </section>
          </main>

          <footer className="bg-dark text-white py-3 mt-5 text-center">
              <div className="container">
                  <p className="mb-0">Movie App</p>
              </div>
          </footer>

          <MovieFormModal
            show={showMovieModal}
            movie={selectedMovie}
            onClose={handleCloseModal}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
        />
      </div>
  );
}

export default App;