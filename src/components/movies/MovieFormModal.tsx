import type { MovieDto } from "../../dtos/movie/MovieDto";
import type { MovieCreateDto } from "../../dtos/movie/MovieCreateDto";
import type { MovieUpdateDto } from "../../dtos/movie/MovieUpdateDto";
import MovieForm from "./MovieForm";

interface MovieFormModalProps {
  show: boolean;
  movie: MovieDto | null;
  onClose: () => void;
  onCreate: (movie: MovieCreateDto) => Promise<void>;
  onUpdate: (id: string, movie: MovieUpdateDto) => Promise<void>;
}

const MovieFormModal = ({
  show,
  movie,
  onClose,
  onCreate,
  onUpdate,
}: MovieFormModalProps) => {
  if (!show) {
    return null;
  }

  const isEdit = movie !== null;

  const handleSubmit = async (movieData: MovieCreateDto) => {
    if (isEdit) {
      const updateMovie: MovieUpdateDto = {
        id: movie.id,
        ...movieData,
      };

      await onUpdate(movie.id, updateMovie);
    } else {
      await onCreate(movieData);
    }

    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h2 className="modal-title">
              {isEdit ? "Edit Movie" : "Add Movie"}
            </h2>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            />
          </div>

          <div className="modal-body">
            <MovieForm movie={movie} onSubmit={handleSubmit} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary me-auto"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" form="movie-form" className="btn btn-success">
              {isEdit ? "Save Changes" : "Add Movie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieFormModal;
