import { API_BASE_URL, HttpMethod, JSON_HEADERS } from "../constants/Constants";
import type { MovieDto } from "../dtos/movie/MovieDto";
import type { MovieCreateDto } from "../dtos/movie/MovieCreateDto";
import type { MovieUpdateDto } from "../dtos/movie/MovieUpdateDto";
import type { MovieDetailDto } from "../dtos/movie/MovieDetailDto";
import { authFetch } from "./AuthService";

const API_URL = API_BASE_URL + "/movies";

export const fetchMovies = async (
  genre?: string,
  search?: string,
): Promise<MovieDto[]> => {
  const url = new URL(API_URL);

  if (genre) {
    url.searchParams.set("genre", genre);
  }

  if (search) {
    url.searchParams.set("search", search);
  }

  const response = await authFetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch movie: ${response.status}`);
  }

  return (await response.json()) as MovieDto[];
};

export const fetchMovie = async (id: string): Promise<MovieDto> => {
  const response = await authFetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Kunde inte hämta filmen: ${response.status}`);
  }

  return (await response.json()) as MovieDto;
};

export const createMovie = async (
  newMovie: MovieCreateDto,
): Promise<MovieDto> => {
  const response = await authFetch(API_URL, {
    method: HttpMethod.POST,
    headers: JSON_HEADERS,
    body: JSON.stringify(newMovie),
  });

  if (!response.ok) {
    throw new Error(`Kunde inte skapa film: ${response.status}`);
  }

  return (await response.json()) as MovieDto;
};

export const deleteMovie = async (id: string): Promise<void> => {
  const response = await authFetch(`${API_URL}/${id}`, {
    method: HttpMethod.DELETE,
  });

  if (!response.ok) {
    throw new Error(`Kunde inte ta bort filmen: ${response.status}`);
  }
};

export const updateMovie = async (
  id: string,
  updateMovie: MovieUpdateDto,
): Promise<void> => {
  const response = await authFetch(`${API_URL}/${id}`, {
    method: HttpMethod.PUT,
    headers: JSON_HEADERS,
    body: JSON.stringify(updateMovie),
  });

  if (!response.ok) {
    throw new Error(`Kunde inte uppdatera filmen: ${response.status}`);
  }
};

export const fetchMovieDetails = async (
  id: string,
): Promise<MovieDetailDto> => {
  const response = await authFetch(`${API_URL}/${id}/details`);

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.status}`);
  }

  return (await response.json()) as MovieDetailDto;
};

export const addActorToMovie = async (
  movieId: string,
  actorId: string,
): Promise<void> => {
  const response = await authFetch(`${API_URL}/${movieId}/actors/${actorId}`, {
    method: HttpMethod.POST,
  });

  if (!response.ok) {
    throw new Error(`Failed to add actor to movie: ${response.status}`);
  }
};
