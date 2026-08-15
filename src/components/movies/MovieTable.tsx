import type { MovieDto } from "../../dtos/movie/MovieDto";
import MovieTableRow from "./MovieRow";

interface MovieTableProps {
  movies: MovieDto[];
  onEdit: (movie: MovieDto) => void;
  onDelete: (id: string) => void;
}

const MovieTable = ({ movies, onEdit, onDelete }: MovieTableProps) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <MovieTableRow
              key={movie.id}
              movie={movie}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
