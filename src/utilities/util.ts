import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY as string;

export const getMoviesByYear = async (year: string, page: number) => {
  try {
    //Creating a param to hit the third party request 
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        language: "en-US",
        page,
        primary_release_year: year,
        sort_by: "popularity.desc",
        api_key: TMDB_API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error while fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

export const getMovieCredits = async (movieId: number) => {
  try {
    //Third party call to retrieve the credits
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    console.log("--------------",response);
    return response.data.crew.filter((member: any) => member.known_for_department === "Editing");
  } catch (error) {
    console.error("Error fetching credits:", error);//logs error but request will not fail 
    return []; // If the credits returns error even though it returns the empty array without error 
  }
};
