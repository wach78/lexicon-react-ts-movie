import { API_BASE_URL, HttpMethod, JSON_HEADERS } from "../constants/Constants";

import type { LoginDto } from "../dtos/auth/LoginDto";
import type { CsrfTokenDto } from "../dtos/auth/CsrfTokenDto";

const API_URL = API_BASE_URL + "/auth";
let csrfToken: string | null = null;
let refreshPromise: Promise<boolean> | null = null;

export const login = async (loginDto: LoginDto): Promise<void> => {
  const loginCsrfToken = await getCsrfToken();

  const response = await fetch(`${API_URL}/login`, {
    method: HttpMethod.POST,
    headers: {
      ...JSON_HEADERS,
      "X-CSRF-TOKEN": loginCsrfToken,
    },
    credentials: "include",
    body: JSON.stringify(loginDto),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

// Important: create a new CSRF token after authentication
  await getCsrfToken();
};

export const refreshSession = async (): Promise<boolean> => {
  try {
    const refreshCsrfToken = await getCsrfToken();

    const response = await fetch(`${API_URL}/refresh`, {
      method: HttpMethod.POST,
      credentials: "include",
      headers: {
        "X-CSRF-TOKEN": refreshCsrfToken,
      },
    });

    if (!response.ok) {
      return false;
    }

    // Access token has now been renewed.
    // Get a new CSRF token for the authenticated user.
    await getCsrfToken();

    return true;
  } catch {
    return false;
  }
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

  const refreshed = await getRefreshPromise();

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
  if (!csrfToken) {
    await getCsrfToken();
  }

  const response = await fetch(`${API_URL}/logout`, {
    method: HttpMethod.POST,
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": csrfToken!,
    },
  });

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.status}`);
  }

  csrfToken = null;
};

const getCsrfToken = async (): Promise<string> => {
  const response = await fetch(`${API_URL}/csrf`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to get CSRF token: ${response.status}`);
  }

  const data = (await response.json()) as CsrfTokenDto;

  csrfToken = data.csrfToken;

  return csrfToken;
};

const getRefreshPromise = (): Promise<boolean> => {
  if (!refreshPromise) {
    refreshPromise = refreshSession().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};
