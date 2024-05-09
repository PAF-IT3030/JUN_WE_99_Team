import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../../../constants";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../../redux/auth/authSlice";

const OAuth2RedirectHandler = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const token = getUrlParameter("token");
  const error = getUrlParameter("error");

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    dispatch(userLoginSuccess(token));
    return (
      <Navigate
        to={{
          pathname: "/",
          state: { from: location },
        }}
      />
    );
  } else {
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: {
            from: location,
            error: error,
          },
        }}
      />
    );
  }
};

export default OAuth2RedirectHandler;
