import { useState } from "react";
import type { SubmitEvent } from "react";
import type { MovieDto } from "../../dtos/movie/MovieDto";
import type { MovieCreateDto } from "../../dtos/movie/MovieCreateDto";

interface MovieFormProps {
    movie?: MovieDto | null;
    onSubmit: (movie: MovieCreateDto) => Promise<void>;
}

const MovieForm = ({
    movie,
    onSubmit
}: MovieFormProps) => {
    const [title, setTitle] = useState(movie?.title ?? "");
    const [year, setYear] = useState(movie?.year ?? 0);
    const [duration, setDuration] = useState(movie?.duration ?? 0);
    const [genreId, setGenreId] = useState<string | null>(movie?.genreId ?? null);

    const handleSubmit = async (
        event: SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const movieData: MovieCreateDto = {
            title,
            year,
            duration,
            genreId
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
                    className="form-control"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="year" className="form-label">
                    Year
                </label>

                <input
                    id="year"
                    type="number"
                    className="form-control"
                    value={year}
                    onChange={event =>
                        setYear(Number(event.target.value))
                    }
                />
            </div>

            <div className="mb-3">
                <label htmlFor="duration" className="form-label">
                    Duration
                </label>

                <input
                    id="duration"
                    type="number"
                    className="form-control"
                    value={duration}
                    onChange={event =>
                        setDuration(Number(event.target.value))
                    }
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
                    onChange={event =>
                        setGenreId(event.target.value)
                    }
                />
            </div>

        </form>
    );
};

export default MovieForm;