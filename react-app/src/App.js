import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserProfile/User";
import { authenticate } from "./store/session";
import Splash from "./components/Splash/Splash";
import OneWb from "./components/Waistbeads/OneWb";
import NewWb from "./components/Waistbeads/NewWb";
import Category from "./components/Categories/Category";
import About from "./components/About/About";
import SearchResults from "./components/Search/SearchResults";
// import { getAllCategories } from "./store/categories";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      // await dispatch(getAllCategories())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <div className="underNav">
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <Route path="/users" exact={true}>
            <UsersList />
          </Route>
          <Route path="/about" exact={true}>
            <About />
          </Route>
          <Route path="/users/:userId" exact={true}>
            <User />
          </Route>
          <Route path="/" exact={true}>
            <Splash />
          </Route>
          <Route path="/waistbeads/new" exact={true}>
            <NewWb />
          </Route>
          <Route path="/waistbeads/:beadId" exact={true}>
            <OneWb />
          </Route>
          <Route path="/categories/:catId" exact={true}>
            <Category />
          </Route>
          <Route path="/search/:word" exact={true}>
            <SearchResults />
          </Route>
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
