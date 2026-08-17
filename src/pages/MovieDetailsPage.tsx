import { fetchMovieDetails, addActorToMovie } from "../services/MovieService";
import { useEffect, useState } from "react";
import type { MovieDetailDto } from "../dtos/movie/MovieDetailDto";
import { useParams } from "react-router";
import ReviewForm from "../components/reviews/ReviewForm";
import type { ReviewCreateDto } from "../dtos/review/ReviewCreateDto";
import { createReview } from "../services/ReviewService";
import { Link } from "react-router";
import type { ActorDto } from "../dtos/actor/ActorDto";
import { fetchActors } from "../services/ActorService";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailDto | null>(null);
  const [actors, setActors] = useState<ActorDto[]>([]);
  const [selectedActorId, setSelectedActorId] = useState("");
  const { id } = useParams();

  const handleCreateReview = async (review: ReviewCreateDto) => {
    if (!id) {
      return;
    }

    const createdReview = await createReview(id, review);

    setMovieDetails((current) =>
      current
        ? {
            ...current,
            reviews: [...current.reviews, createdReview],
          }
        : current,
    );
  };

  const handleAddActor = async () => {
    if (!id || !selectedActorId) {
      return;
    }

    await addActorToMovie(id, selectedActorId);

    const updatedMovie = await fetchMovieDetails(id);
    setMovieDetails(updatedMovie);

    setSelectedActorId("");
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    const loadData = async (id: string) => {
      const data = await fetchMovieDetails(id);
      setMovieDetails(data);

      const actorData = await fetchActors();
      setActors(actorData);
    };

    loadData(id);
  }, [id]);

  return (
    <div className="container">
      <Link to="/" className="btn btn-secondary mb-3">
        Back to movies
      </Link>
      <div className="row">
        <div className="col-md-6">
          {movieDetails && (
            <>
              <h2>{movieDetails.title}</h2>

              <p>Year: {movieDetails.year}</p>
              <p>Duration: {movieDetails.duration}</p>
              <p>Genre: {movieDetails.genreName ?? "No genre"}</p>

              <h3>Actors</h3>
              <ul className="list-unstyled mb-3">
                {movieDetails.actors.map((actor) => (
                  <li key={actor.id}>
                    {actor.name}
                    <hr />
                  </li>
                ))}
              </ul>

              <h3>Movie details</h3>
              <ul className="list-unstyled mb-3">
                <p>{movieDetails.movieDetails?.synopsis}</p>
                <p>Language: {movieDetails.movieDetails?.language}</p>
                <p>Budget: {movieDetails.movieDetails?.budget}</p>
              </ul>
            </>
          )}
        </div>

        <div className="col-md-6">
          {movieDetails && (
            <>
              <h3>Reviews</h3>

              <ul className="list-unstyled mb-3">
                {movieDetails.reviews.map((review) => (
                  <li key={review.id}>
                    <p>Comment: {review.comment}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Reviewer: {review.reviewerName}</p>
                    <hr />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h3>Add actor</h3>
          <div className="input-group mb-3">
            <select
              className="form-select"
              value={selectedActorId}
              onChange={(event) => setSelectedActorId(event.target.value)}
            >
              <option value="">Select actor</option>

              {actors.map((actor) => (
                <option key={actor.id} value={actor.id}>
                  {actor.name}
                </option>
              ))}
            </select>
            <button
              className="btn btn-success"
              type="button"
              onClick={handleAddActor}
              disabled={!selectedActorId}
            >
              Add actor
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <h3>Add Review</h3>

          <ReviewForm onSubmit={handleCreateReview} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
