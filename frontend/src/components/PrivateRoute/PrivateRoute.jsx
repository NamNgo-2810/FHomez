import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
function PrivateRoute({ component: Component, roles, ...rest }) {
  const authCtx = useContext(AuthContext);
  // If not logged in then redirect to login page
  if (!authCtx.user) {
    return <Navigate to="/" replace />;
  }

  // restricted by role
  if (roles && roles.indexOf(authCtx.user.role) === -1) {
    return <Navigate to="/" replace />;
  }

  // Redirect to admin page
  if (roles.indexOf("admin") && authCtx.user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  // authorized then return component
    return <Outlet />;
}

export default PrivateRoute;
