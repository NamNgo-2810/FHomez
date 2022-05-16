import { createContext } from "react";

const AuthContext = createContext(localStorage.jwt)



export default AuthContext