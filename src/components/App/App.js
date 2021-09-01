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
import * as MainApi from "../../utils/MainApi";
import { InfoTooltip } from "../InfoTooltip/InfoTooltip";
import tooltipSuccess from "./../../images/tooltip-success.svg";
import tooltipDeny from "./../../images/tooltip-deny.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

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

  //хуки, получающие данные с сервера
  useEffect(() => {
    checkToken();
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

  //авторизация пользователя
  const handleLogin = ({ email, password }) => {
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
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoToolTipOpen(true);
        console.log(error);
      });
  };

  // проверка статуса авторизации пользователя

  const checkToken = () => {
    auth
      .getUser()
      .then((user) => {
        setLoggedIn();
        setCurrentUser(user);
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

  //выход

  const handleLogOut = () => {
    return auth
      .logout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        history.push("/");
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

  // обработчик редактирования профиля
  const handleUpdateProfile = (newData) => {
    MainApi.updateProfile(newData)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
    /*    .finally(() => setIsLoading(false)); */
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
          <Profile
            handleLogOut={handleLogOut}
            onUpdateProfile={handleUpdateProfile}
          />
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
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          infoToolTipMessage={infoToolTipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
