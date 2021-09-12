import React, { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import * as MainApi from "../../utils/MainApi";
import { InfoTooltip } from "../InfoTooltip/InfoTooltip";
import tooltipSuccess from "./../../images/tooltip-success.svg";
import tooltipDeny from "./../../images/tooltip-deny.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import {
  LOGIN,
  REGISTER,
  MAIN,
  MOVIES,
  SAVEDMOVIES,
  PROFILE,
} from "./../../utils/utils";

function App() {
  const history = useHistory();
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isNavigationPopupOpened, setIsNavigationPopupOpened] =
    React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [infoToolTipMessage, setInfoToolTipMessage] = React.useState({
    icon: "",
    message: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  // проверка статуса авторизации пользователя
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    auth
      .getUser()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        history.push(
          location.pathname === LOGIN || location.pathname === REGISTER
            ? "/"
            : location.pathname
        );
      })
      .catch((error) => {
        if (
          location.pathname === MOVIES ||
          location.pathname === SAVEDMOVIES ||
          location.pathname === PROFILE
        ) {
          handleInfoToolTipMessage({
            icon: tooltipDeny,
            message: "Пожалуйста авторизуйтесь для просмотра информации.",
          });
          handleInfoToolTipOpen(true);
          console.log(error);
        } else {
          history.push(location.pathname);
        }
      });
  };

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

  //Регистрация пользователя
  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    return auth
      .register({ name, email, password })
      .then((data) => {
        handleLogin({ email, password });
      })
      .catch((error) => {
        handleInfoToolTipMessage({
          icon: tooltipDeny,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoToolTipOpen(true);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  //авторизация пользователя
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    return auth
      .authorize({ email, password })
      .then((res) => {
        setCurrentUser(res.data);
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
          message: "Неправильный логин или пароль. Попробуйте ещё раз.",
        });
        handleInfoToolTipOpen(true);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  //выход

  const handleLogOut = () => {
    setIsLoading(true);
    return auth
      .logout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
        history.push("/");
      })
      .catch((error) => {
        handleInfoToolTipMessage({
          icon: tooltipDeny,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoToolTipOpen(true);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  // обработчик редактирования профиля
  const handleUpdateProfile = (newData) => {
    setIsLoading(true);
    MainApi.updateProfile(newData)
      .then((user) => {
        setCurrentUser(user);
        handleInfoToolTipMessage({
          icon: tooltipSuccess,
          message: "Информация обновлена!",
        });
        handleInfoToolTipOpen(true);
      })
      .catch((error) => {
        handleInfoToolTipMessage({
          icon: tooltipDeny,
          message:
            "Ошибка при редактировании профиля. Проверьте правильность заполнения данных.",
        });
        handleInfoToolTipOpen(true);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path={MAIN}>
            <Header onClick={handleBurgerMenuClick} loggedIn={loggedIn} />
            <Main />
            <Footer />
            <Navigation
              isOpen={isNavigationPopupOpened}
              onClose={closeAllPopups}
            />
          </Route>
          <Route path={REGISTER}>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path={LOGIN}>
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute
            path={MOVIES}
            component={Movies}
            loggedIn={loggedIn}
            isOpen={isNavigationPopupOpened}
            onClose={closeAllPopups}
            onClick={handleBurgerMenuClick}
          />
          <ProtectedRoute
            path={SAVEDMOVIES}
            loggedIn={loggedIn}
            component={Movies}
            isOpen={isNavigationPopupOpened}
            onClose={closeAllPopups}
            onClick={handleBurgerMenuClick}
          />
          <ProtectedRoute
            path={PROFILE}
            loggedIn={loggedIn}
            component={Profile}
            handleLogOut={handleLogOut}
            onUpdateProfile={handleUpdateProfile}
            isOpen={isNavigationPopupOpened}
            onClose={closeAllPopups}
            onClick={handleBurgerMenuClick}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          infoToolTipMessage={infoToolTipMessage}
        />
        <Preloader isLoading={isLoading} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
