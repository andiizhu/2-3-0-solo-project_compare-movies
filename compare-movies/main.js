import "./style.css";
import { makeMovieCard, initMovieCompare } from "./js/dom-helpers";
import { handleAddMovie, handleDefault } from "./js/event-handlers";
import { renderChart } from "./js/chart";

const main = () => {
  document
    .querySelector("#default-movies")
    .addEventListener("click", handleDefault);
  initMovieCompare();
  document.querySelector("form").addEventListener("submit", handleAddMovie);
  document.addEventListener("storageChange", renderChart);
};

main();
