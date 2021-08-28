import { server } from "./constants.js";

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getBeatFilmMovies() {
    return fetch(`${this._baseUrl}$/beatfilm-movies`, {
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: server,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
