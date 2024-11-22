import express from "express";
import dotenv from "dotenv";
import {getMovies} from "./controller/movieController";

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;

app.get("/movies", getMovies);//Route which is used to retrieve the movies

app.listen(port, () => {
  console.log(`Server running on port ${port}`);// Returns if the server is running on a port
});
