import { API_BASE_URL, HttpMethod, JSON_HEADERS } from "../constants/Constants";

import type { LoginDto } from "../dtos/auth/LoginDto";
import type { TokenDto } from "../dtos/auth/TokenDto";

const API_URL = API_BASE_URL + "/auth";

export const login = async (loginDto: LoginDto): Promise<TokenDto> => {
  const response = await fetch(`${API_URL}/login`, {
    method: HttpMethod.POST,
    headers: JSON_HEADERS,
    credentials: "include",
    body: JSON.stringify(loginDto),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  return (await response.json()) as TokenDto;
};

export const refreshToken = async (): Promise<TokenDto> => {
  const response = await fetch(`${API_URL}/refresh`, {
    method: HttpMethod.POST,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Refresh token failed: ${response.status}`);
  }

  return (await response.json()) as TokenDto;
};

export const refreshSession = async (): Promise<string | null> => {
  try {
    const tokens = await refreshToken();

    sessionStorage.setItem("accessToken", tokens.accessToken);

    return tokens.accessToken;
  } catch {
    sessionStorage.removeItem("accessToken");

    return null;
  }
};

export const authFetch = async (
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> => {
  const headers = new Headers(init.headers);
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status !== 401) {
    return response;
  }

  const newAccessToken = await refreshSession();

  if (!newAccessToken) {
    return response;
  }

  headers.set("Authorization", `Bearer ${newAccessToken}`);

  response = await fetch(input, {
    ...init,
    headers,
  });

  return response;
};

export const logout = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}/logout`, {
      method: HttpMethod.POST,
      credentials: "include",
    });
  } finally {
    sessionStorage.removeItem("accessToken");
  }
};
