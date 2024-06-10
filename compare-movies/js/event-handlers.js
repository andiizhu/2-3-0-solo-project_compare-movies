import { initMovieCompare, makeMovieCard } from "./dom-helpers";
import movieData from "../../movie-data.json";
import {
  setLocalStorageKey,
  getLocalStorageKey,
  getMovieList,
  setMovieList,
  addMovie,
  removeMovie,
} from "./local-storage-helpers";
import { renderChart } from "./chart";

export const handleAddMovie = (event) => {
  event.preventDefault();
  const form = event.target;
  const criticScore = form.criticScore.value;
  const audienceScore = form.audienceScore.value;
  const domestic = form.domestic.value;
  const genre = form.genre.value;
  const title = form.title.value;

  makeMovieCard({ criticScore, audienceScore, domestic, genre, title });

  const movieList = getLocalStorageKey("movieList");
  movieList.push({ criticScore, audienceScore, domestic, genre, title });
  setLocalStorageKey("movieList", movieList);

  form.reset();
};

export const handleDefault = (event) => {
  localStorage.clear();
  const movieList = document.querySelector("#movies-list");
  movieList.innerHTML = "";
  setLocalStorageKey("movieList", movieData);
  getLocalStorageKey("movieList").forEach(makeMovieCard);
  renderChart();
};
