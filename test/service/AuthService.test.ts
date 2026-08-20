import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  API_BASE_URL,
  HttpMethod,
  JSON_HEADERS,
} from "../../src/constants/Constants";

//import type { LoginDto } from "../../src/dtos/auth/LoginDto";

import {
  /*authFetch,
  checkAuth,*/
  login,
 /* logout,
  refreshSession,*/
} from "../../src/services/AuthService";

const mockedFetch = vi.fn();

vi.stubGlobal("fetch", mockedFetch);

const API_URL = API_BASE_URL + "/auth";

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("should login successfully", async () => {
      mockedFetch
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({
            csrfToken: "csrf-token-before-login",
          }),
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          status: 204,
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({
            csrfToken: "csrf-token-after-login",
          }),
        } as unknown as Response);

      await login({
        email: "admin@example.com",
        password: "Admin123!",
      });

      expect(mockedFetch).toHaveBeenNthCalledWith(2, `${API_URL}/login`, {
        method: HttpMethod.POST,
        headers: {
          ...JSON_HEADERS,
          "X-CSRF-TOKEN": "csrf-token-before-login",
        },
        credentials: "include",
        body: JSON.stringify({
          email: "admin@example.com",
          password: "Admin123!",
        }),
      });

      expect(mockedFetch).toHaveBeenCalledTimes(3);
    });

    it("should throw when credentials are invalid", async () => {
      mockedFetch
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({
            csrfToken: "csrf-token-before-login",
          }),
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
        } as unknown as Response);

      await expect(
        login({
          email: "adminnnnn@example.com",
          password: "Admin123!",
        }),
      ).rejects.toThrow("Login failed: 401");

      expect(mockedFetch).toHaveBeenCalledTimes(2);
    });

    it("should throw when initial csrf token request fails", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as unknown as Response);

      await expect(
        login({
          email: "admin@example.com",
          password: "Admin123!",
        }),
      ).rejects.toThrow("Failed to get CSRF token: 500");

      expect(mockedFetch).toHaveBeenCalledTimes(1);
    });
    it("should throw if csrf refresh after login fails", async () => {
      mockedFetch
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({
            csrfToken: "csrf-token-before-login",
          }),
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          status: 204,
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
        } as unknown as Response);

      await expect(
        login({
          email: "admin@example.com",
          password: "Admin123!",
        }),
      ).rejects.toThrow("Failed to get CSRF token: 500");

      expect(mockedFetch).toHaveBeenCalledTimes(3);
    });
    it("should send correct login request", async () => {
      mockedFetch
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({
            csrfToken: "csrf-token-before-login",
          }),
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          status: 204,
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: vi.fn().mockResolvedValue({
            csrfToken: "csrf-token-after-login",
          }),
        } as unknown as Response);

      await login({
        email: "admin@example.com",
        password: "Admin123!",
      });

      expect(mockedFetch).toHaveBeenNthCalledWith(2, `${API_URL}/login`, {
        method: HttpMethod.POST,
        headers: {
          ...JSON_HEADERS,
          "X-CSRF-TOKEN": "csrf-token-before-login",
        },
        credentials: "include",
        body: JSON.stringify({
          email: "admin@example.com",
          password: "Admin123!",
        }),
      });
    });
  });
});
