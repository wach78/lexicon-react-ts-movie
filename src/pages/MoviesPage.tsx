import { useEffect, useState } from "react";
import type { MovieDto } from "../dtos/movie/MovieDto";
import type { MovieCreateDto } from "../dtos/movie/MovieCreateDto";
import type { MovieUpdateDto } from "../dtos/movie/MovieUpdateDto";

import MovieTable from "../components/movies/MovieTable";
import MovieFormModal from "../components/movies/MovieFormModal";
import GenreSelect from "../components/movies/GenreSelect";

import {
  createMovie,
  fetchMovies,
  updateMovie,
  deleteMovie,
} from "../services/MovieService";

const MoviePage = () => {
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDto | null>(null);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);

      const uniqueGenres = [
        ...new Set(
          data
            .map((movie) => movie.genreName)
            .filter((genre) => genre !== null),
        ),
      ];

      setGenres(uniqueGenres);
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
    await deleteMovie(id);

    const updatedMovies = await fetchMovies();
    setMovies(updatedMovies);
  };

  const handleCreate = async (movie: MovieCreateDto) => {
    const createdMovie = await createMovie(movie);

    setMovies((currentMovies) => [...currentMovies, createdMovie]);
  };

  const handleUpdate = async (id: string, movie: MovieUpdateDto) => {
    await updateMovie(id, movie);

    const updatedMovies = await fetchMovies();
    setMovies(updatedMovies);
  };

  const handleGenreChange = async (genre: string) => {
    setSelectedGenre(genre);

    const data = await fetchMovies(genre === "" ? undefined : genre);

    setMovies(data);
  };

  return (
    <>
      <section className="border rounded border-success p-3 text-center">
        <h2>Movies</h2>

        <button
          type="button"
          className="btn btn-success mb-3"
          onClick={handleAdd}
        >
          Add Movie
        </button>

        <GenreSelect
          genres={genres}
          selectedGenre={selectedGenre}
          onChange={handleGenreChange}
        />

        <MovieTable
          movies={movies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>

      <MovieFormModal
        show={showMovieModal}
        movie={selectedMovie}
        onClose={handleCloseModal}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default MoviePage;
