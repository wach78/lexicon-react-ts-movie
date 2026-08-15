import { API_BASE_URL, HttpMethod, JSON_HEADERS } from "../constants/Constants";
import type { ReviewDto } from "../dtos/review/ReviewDto";
import type { ReviewCreateDto } from "../dtos/review/ReviewCreateDto";

export const createReview = async (
  movieId: string,
  newReview: ReviewCreateDto,
): Promise<ReviewDto> => {
  const response = await fetch(`${API_BASE_URL}/movies/${movieId}/reviews`, {
    method: HttpMethod.POST,
    headers: JSON_HEADERS,
    body: JSON.stringify(newReview),
  });

  if (!response.ok) {
    throw new Error(`Kunde inte skapa recension: ${response.status}`);
  }

  return (await response.json()) as ReviewDto;
};
