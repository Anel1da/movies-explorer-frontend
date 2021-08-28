import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Navigation from "../Navigation/Navigation";
import * as auth from "../../utils/auth";
import { InfoTooltip } from "../InfoTooltip/InfoTooltip";
import tooltipSuccess from "./../../images/tooltip-success.svg";
import tooltipDeny from "./../../images/tooltip-deny.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const history = useHistory();

  //стейт переменные
  const [isNavigationPopupOpened, setIsNavigationPopupOpened] =
    React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [infoToolTipMessage, setInfoToolTipMessage] = React.useState({
    icon: "",
    message: "",
  });

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .getUsersInfo(jwt)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        console.log(userInfo);
      })
      .catch((error) => console.log(error));
  }, []);

  //обработчики событий
  const handleBurgerMenuClick = () => {
    setIsNavigationPopupOpened(true);
  };

  const handleInfoToolTipOpen = () => {
    setIsInfoToolTipOpen(true);
  };

  const handleInfoToolTipMessage = ({ icon, message }) => {
    setInfoToolTipMessage({ icon: icon, message: message });
  };

  const closeAllPopups = () => {
    setIsNavigationPopupOpened(false);
    setIsInfoToolTipOpen(false);
  };

  //авторизация пользователя
  const handleLogin = ({ email, password }) => {
    return auth
      .authorize({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        handleInfoToolTipMessage({
          icon: tooltipSuccess,
          message: "Вы успешно авторизовались!",
        });
        handleInfoToolTipOpen(true);
        history.push("/movies");
      })

      .catch((error) => {
        handleInfoToolTipMessage({
          icon: tooltipDeny,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoToolTipOpen(true);
        console.log(error);
      });
  };

  //Регистрация пользователя
  const handleRegister = ({ name, email, password }) => {
    return auth
      .register({ name, email, password })
      .then((data) => {
        handleInfoToolTipMessage({
          icon: tooltipSuccess,
          message: "Вы успешно зарегистрировались!",
        });
        handleInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch((error) => {
        handleInfoToolTipMessage({
          icon: tooltipDeny,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoToolTipOpen(true);
        console.log(error);
      });
  };

  //выход

  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onClick={handleBurgerMenuClick} />
        <Route exact path="/">
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Movies />
          <Navigation
            isOpen={isNavigationPopupOpened}
            onClose={closeAllPopups}
          />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Movies />

          <Footer />
          <Navigation
            isOpen={isNavigationPopupOpened}
            onClose={closeAllPopups}
          />
        </Route>
        <Route path="/profile">
          <Profile handleLogOut={handleLogOut} />
          <Navigation
            isOpen={isNavigationPopupOpened}
            onClose={closeAllPopups}
          />
        </Route>
        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>
        {/*   <Route path="*">
        <NotFound />
      </Route> */}
      </div>
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        infoToolTipMessage={infoToolTipMessage}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
