import React from "react";
import { Route } from "react-router-dom";
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

function App() {
  return (
    <div className="page">
      <Header />
      <Route exact path="/">
        <Main />
        <Footer />
      </Route>
      <Route path="/movies">
        <Movies />
        <Navigation />
        <Footer />
      </Route>
      <Route path="/saved-movies">
        <Movies />
        <Footer />
        <Navigation />
      </Route>
      <Route path="/profile">
        <Profile />
        <Navigation />
      </Route>
      <Route path="/signup">
        <Register />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/notfound">
        <NotFound /> {/* проверка отрисовки блока */}
      </Route>
    </div>
  );
}

export default App;
