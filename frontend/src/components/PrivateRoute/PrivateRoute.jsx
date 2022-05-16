import React, { useContext } from 'react'
import { Route,Redirect } from "react-router-dom";
function PrivateRoute({component:Component,roles,...rest}) {

    const authCtx = useContext(AuthContext)
  return (
    
    <Route {...rest} render={(props) => {

        // If not logged in then redirect to login page 
        if (!authCtx.user) {
          return <Redirect to='/login' />
        }
  
        // restricted by role 
        if (roles && roles.indexOf(authCtx.user.role) === -1) {
          return <Redirect to='/login' />
        }
        // authorized then return component
        if (Component) {
          return <Component {...props} />
        }
  
      }
  
      } ></Route>
   )
}

export default PrivateRoute