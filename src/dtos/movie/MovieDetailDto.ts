import type { ReviewDto } from "../review/ReviewDto";
import type { ActorDto } from "../actor/ActorDto";
import type { MovieDetailsDto } from "./MovieDetailsDto";

export interface MovieDetailDto {
  id: string;
  title: string;
  year: number;
  duration: number;
  genreId: string | null;
  genreName: string | null;
  reviews: ReviewDto[];
  actors: ActorDto[];
  movieDetails: MovieDetailsDto | null;
}
