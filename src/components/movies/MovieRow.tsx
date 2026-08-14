import type { MovieDto } from "../../dtos/movie/MovieDto";
import { Link } from "react-router";

interface MovieTableRowProps {
  movie: MovieDto;
  onEdit: (movie: MovieDto) => void;
  onDelete: (id: string) => void;
}

const MovieTableRow = ({ movie, onEdit, onDelete }: MovieTableRowProps) => {
  return (
    <tr>
      <td>
        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      </td>
      <td>{movie.year}</td>
      <td>{movie.duration}</td>
      <td>{movie.genreName ?? "No genre"}</td>

      <td>
        <button
          type="button"
          className="btn btn-warning me-2"
          onClick={() => onEdit(movie)}
        >
          Edit
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(movie.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MovieTableRow;
