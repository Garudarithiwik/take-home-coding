import { getMoviesByYear, getMovieCredits } from "../utilities/util";

export const accessMovies = async (year: string, page: number) => {
  //Calls a function to retrive the movies by the year mentioned
  const movies = await getMoviesByYear(year, page);
  //Calls a function to retrive the credits by the ID 
  const movieDetails = await Promise.all(
    movies.map(async (movie: any) => {
      const editors = await getMovieCredits(movie.id);
      return {
        Title: movie.title,
        Release_date: new Date(movie.release_date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        Vote_average: movie.vote_average,
        editors: editors.map((editor: any) => editor.name),
      };
    })
  );

  return movieDetails;
};
