import { Request, Response } from "express";
import { accessMovies } from "../services/movieService";

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  const { primary_release_year, page } = req.query;
  // Bad response status code will be the response, if the year is not mentioned in the real time search
  if (!primary_release_year) {
    res.status(400).json({ message: "Year is Mandatory for search" });
    return;
  }

  try {

    const movieCollection = await accessMovies(primary_release_year as string, Number(page) || 1);
    res.json(movieCollection);  // Response of the collection of movies retrieved from the third party web site
  } catch (error) {
    res.status(500).json({ message: "Error while fetching movies" });
  }
};
