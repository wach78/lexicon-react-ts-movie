import { useState } from "react";
import type { SubmitEvent } from "react";
import type { MovieDto } from "../../dtos/movie/MovieDto";
import type { MovieCreateDto } from "../../dtos/movie/MovieCreateDto";
import { MOVIE_VALIDATION } from "../../constants/MovieValidationConstants";

interface MovieFormProps {
  movie?: MovieDto | null;
  onSubmit: (movie: MovieCreateDto) => Promise<void>;
}

const MovieForm = ({ movie, onSubmit }: MovieFormProps) => {
  const [title, setTitle] = useState(movie?.title ?? "");
  const [year, setYear] = useState(movie?.year ?? MOVIE_VALIDATION.minimumYear);
  const [duration, setDuration] = useState(
    movie?.duration ?? MOVIE_VALIDATION.minimumDuration,
  );
  const [genreId, setGenreId] = useState<string | null>(movie?.genreId ?? null);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const movieData: MovieCreateDto = {
      title,
      year,
      duration,
      genreId,
    };

    await onSubmit(movieData);
  };

  return (
    <form id="movie-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>

        <input
          id="title"
          type="text"
          maxLength={MOVIE_VALIDATION.titleMaxLength}
          className="form-control"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Year
        </label>

        <input
          id="year"
          type="number"
          min={MOVIE_VALIDATION.minimumYear}
          max={MOVIE_VALIDATION.maximumYear}
          className="form-control"
          value={year}
          onChange={(event) => setYear(Number(event.target.value))}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="duration" className="form-label">
          Duration
        </label>

        <input
          id="duration"
          type="number"
          min={MOVIE_VALIDATION.minimumDuration}
          max={MOVIE_VALIDATION.maximumDuration}
          className="form-control"
          value={duration}
          onChange={(event) => setDuration(Number(event.target.value))}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="duration" className="form-label">
          Genre Id
        </label>

        <input
          id="genreId"
          type="text"
          className="form-control"
          value={genreId ?? ""}
          onChange={(event) =>
            setGenreId(event.target.value === "" ? null : event.target.value)
          }
        />
      </div>
    </form>
  );
};

export default MovieForm;
