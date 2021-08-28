class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _getResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getMovies(jwt) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponse(res));
  }

  saveMovie(jwt, movie) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image.url,
        trailer: movie.trailer,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.id,
      }),
    }).then((res) => this._getResponse(res));
  }

  deleteSavedMovie(jwt, movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => this._getResponse(res));
  }

  toggleMoviesState(jwt, movie, movieId, isSaved) {
    return isSaved
      ? this.deleteSavedMovie(jwt, movieId)
      : this.saveMovie(jwt, movie);
  }

  getUsersInfo(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponse(res));
  }

  updateUserInfo(jwt, email, name) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        email,
        name,
      }),
    }).then((res) => this._getResponse(res));
  }
}

const mainApi = new MainApi({
  baseUrl: "https://auth.nomoreparties.co",
});

export default mainApi;
