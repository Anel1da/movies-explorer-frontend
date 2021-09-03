export const BASE_URL_MOVIE = "https://api.nomoreparties.co";

export const getMovies = () => {
  return fetch(`${BASE_URL_MOVIE}/beatfilm-movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
