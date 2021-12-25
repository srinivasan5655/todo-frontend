import React from "react";
import AddTodo from "./addTodo/AddTodo";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "../protectedRoute";

const App = () => {
  const logout = (history) => {
    localStorage.removeItem("loginData");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route path="/signup" exact component={SignUp} />
          <ProtectedRoute
            path="/todos"
            exact
            component={AddTodo}
            logout={logout}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
