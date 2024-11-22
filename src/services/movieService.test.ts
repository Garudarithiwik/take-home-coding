import { accessMovies } from "./movieService";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("accessMovies", () => {
  it("should fetch and return movies correctly", async () => {
    const mockMovies = [
      { id: 1, title: "Test Movie", release_date: "2020-11-01", vote_average: 9 },
    ];
    const mockCredits = {
      crew: [
        { id: 101, name: "Tess Mike", known_for_department: "Editing" },
      ],
    };

    // Mock the getMoviesByYear response
    mockedAxios.get.mockResolvedValueOnce({ data: { results: mockMovies } });

    // Mock the getMovieCredits response
    mockedAxios.get.mockResolvedValueOnce({ data: mockCredits });

    const movies = await accessMovies("2020", 1);

    expect(movies).toHaveLength(1);
    expect(movies[0].Title).toBe("Test Movie");
    expect(movies[0].Vote_average).toBe(9);
    expect(movies[0].editors).toEqual(["Tess Mike"]);
  });
});
