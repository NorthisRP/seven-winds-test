import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RandomData from "./pages/RandomData";
import Register from "./pages/Register";
import ToDo from "./pages/ToDo";
import { useTypedSelector } from "./hooks/useTypedSelector";

export default function App() {
  const token = useTypedSelector((state) => state.token);

  return (
    <BrowserRouter>
      {token ? (
        <Switch>
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/todo" component={ToDo} />
          <Route exact path="/random" component={RandomData} />
          <Redirect to="/profile" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Redirect to="/login" />
        </Switch>
      )}
    </BrowserRouter>
  );
}
