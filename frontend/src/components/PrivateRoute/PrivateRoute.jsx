import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
function PrivateRoute({ component: Component, roles, ...rest }) {
  const authCtx = useContext(AuthContext);
  // If not logged in then redirect to login page
  if (!authCtx.user) {
    return <Navigate to="/" />;
  }

  // restricted by role
  if (roles && roles.indexOf(authCtx.user.role) === -1) {
    return <Navigate to="/" />;
  }
  // authorized then return component
  if (authCtx.user.role.includes("admin")) {
    return <Outlet />;
  }
}

export default PrivateRoute;
