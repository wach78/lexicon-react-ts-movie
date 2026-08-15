import { fetchMovieDetails } from "../services/MovieService";
import { useEffect, useState } from "react";
import type { MovieDetailDto } from "../dtos/movie/MovieDetailDto";
import { useParams } from "react-router";
import ReviewForm from "../components/reviews/ReviewForm";
import type { ReviewCreateDto } from "../dtos/review/ReviewCreateDto";
import { createReview } from "../services/ReviewService";
import { Link } from "react-router";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailDto | null>(null);
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

  useEffect(() => {
    if (!id) {
      return;
    }
    const loadMovieDetails = async (id: string) => {
      const data = await fetchMovieDetails(id);
      setMovieDetails(data);
    };

    loadMovieDetails(id);
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
          <h3>Add Review</h3>

          <ReviewForm onSubmit={handleCreateReview} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
