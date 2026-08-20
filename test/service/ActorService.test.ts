import { beforeEach, describe, expect, it, vi } from "vitest";
import { API_BASE_URL } from "../../src/constants/Constants";
import type { ActorDto } from "../../src/dtos/actor/ActorDto";
import { fetchActors } from "../../src/services/ActorService";
import { authFetch } from "../../src/services/AuthService";

vi.mock("../../src/services/AuthService", () => ({
  authFetch: vi.fn(),
}));

const mockedAuthFetch = vi.mocked(authFetch);

describe("ActorService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchActors", () => {
    it("should fetch actors from the correct API endpoint", async () => {
      const actors: ActorDto[] = [
        {
          id: "1",
          name: "Actor One",
          birthYear: 1980,
        },
        {
          id: "2",
          name: "Actor Two",
          birthYear: 1990,
        },
      ];

      mockedAuthFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(actors),
      } as unknown as Response);

      await fetchActors();

      expect(mockedAuthFetch).toHaveBeenCalledWith(`${API_BASE_URL}/actors`);

      expect(mockedAuthFetch).toHaveBeenCalledTimes(1);
    });

    it("should return actors when the request succeeds", async () => {
      const actors: ActorDto[] = [
        {
          id: "1",
          name: "Actor One",
          birthYear: 1980,
        },
        {
          id: "2",
          name: "Actor Two",
          birthYear: 1990,
        },
      ];

      mockedAuthFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(actors),
      } as unknown as Response);

      const result = await fetchActors();

      expect(result).toEqual(actors);
    });

    it("should return an empty array when the API returns no actors", async () => {
      mockedAuthFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue([]),
      } as unknown as Response);

      const result = await fetchActors();

      expect(result).toEqual([]);
    });

    it("should throw an error when the request fails", async () => {
      const json = vi.fn();

      mockedAuthFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json,
      } as unknown as Response);

      await expect(fetchActors()).rejects.toThrow(
        "Failed to fetch actors: 500",
      );

      expect(json).not.toHaveBeenCalled();
    });

    it("should include the HTTP status code in the error", async () => {
      mockedAuthFetch.mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(fetchActors()).rejects.toThrow(
        "Failed to fetch actors: 404",
      );
    });

    it("should propagate errors from authFetch", async () => {
      mockedAuthFetch.mockRejectedValue(new Error("Network error"));

      await expect(fetchActors()).rejects.toThrow("Network error");
    });

    it("should propagate errors when the response contains invalid JSON", async () => {
      mockedAuthFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
      } as unknown as Response);

      await expect(fetchActors()).rejects.toThrow("Invalid JSON");
    });
  });
});
