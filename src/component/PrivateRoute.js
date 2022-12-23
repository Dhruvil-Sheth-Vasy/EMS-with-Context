import React from "react";
import { Redirect, Route } from "react-router-dom";
import { fakeAuth } from "../Layout/Login/Login";

function PrivateRoute({ children, ...rest }) {

    // console.log(fakeAuth)

  return (
    <Route
      {...rest}
      render={() => {
        return fakeAuth.isAuthenticated === true ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

export default PrivateRoute;
