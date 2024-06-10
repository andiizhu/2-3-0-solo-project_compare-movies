export const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  const event = new Event("storageChange");
  document.dispatchEvent(event);
};

export const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMovieList = getLocalStorageKey("movieList");
export const setMovieList = (movieList) =>
  setLocalStorageKey("movieList", movieList);

export const addMovie = (movie) => {
  const movieList = getMovieList();
  setMovieList([...movieList, movie]);
};

export const removeMovie = (removeMovie) => {
  const movieList = getMovieList.filter((name) => name !== removeMovie);
  setNames([...movieList]);
};
