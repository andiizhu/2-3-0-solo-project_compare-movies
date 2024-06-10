import movieData from "../../movie-data.json";
import { renderChart } from "./chart";
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "./local-storage-helpers";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if (!getLocalStorageKey("movieList")) {
  setLocalStorageKey("movieList", movieData);
}

export const makeMovieCard = (movieData) => {
  const { criticScore, audienceScore, domestic, genre, title } = movieData;

  const li = document.createElement("li");
  const h3 = document.createElement("h3");
  const criticScoreP = document.createElement("p");
  const audienceScoreP = document.createElement("p");
  const domesticP = document.createElement("p");
  const genreP = document.createElement("p");
  li.tabIndex = 0;

  h3.textContent = title;
  h3.classList.add("h3");
  criticScoreP.textContent = "Critic Score: " + criticScore + "%";
  audienceScoreP.textContent = "Audience Score: " + audienceScore + "%";
  domesticP.textContent = "Domestic Total: $" + numberWithCommas(domestic);
  genreP.textContent +=
    "Genre: " + genre.slice(0, 1).toUpperCase() + genre.slice(1);

  li.append(h3, criticScoreP, audienceScoreP, domesticP, genreP);
  document.querySelector("#movies-list").append(li);
};

export const initMovieCompare = () => {
  getLocalStorageKey("movieList").forEach(makeMovieCard);
  renderChart();
};
