import { API_BASE_URL } from "../constants/Constants";
import type { ActorDto } from "../dtos/actor/ActorDto";

const API_URL = API_BASE_URL + "/actors";

export const fetchActors = async (): Promise<ActorDto[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch actors: ${response.status}`);
  }

  return (await response.json()) as ActorDto[];
};
