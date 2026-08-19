import { API_BASE_URL, HttpMethod, JSON_HEADERS } from "../constants/Constants";

import type { LoginDto } from "../dtos/auth/LoginDto";

const API_URL = API_BASE_URL + "/auth";

export const login = async (loginDto: LoginDto): Promise<void> => {
  const response = await fetch(`${API_URL}/login`, {
    method: HttpMethod.POST,
    headers: JSON_HEADERS,
    credentials: "include",
    body: JSON.stringify(loginDto),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }
};

export const refreshSession = async (): Promise<boolean> => {
  const response = await fetch(`${API_URL}/refresh`, {
    method: HttpMethod.POST,
    credentials: "include",
  });

  return response.ok;
};

export const authFetch = async (
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> => {
  let response = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshed = await refreshSession();

  if (!refreshed) {
    return response;
  }

  response = await fetch(input, {
    ...init,
    credentials: "include",
  });

  return response;
};

export const checkAuth = async (): Promise<boolean> => {
  const response = await authFetch(`${API_URL}/me`);

  return response.ok;
};

export const logout = async (): Promise<void> => {
  await fetch(`${API_URL}/logout`, {
    method: HttpMethod.POST,
    credentials: "include",
  });
};
