import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./containers/Home";
import UploadForm from "./components/UploadForm/UploadForm";
import Chat from "./components/Chat/Chat";
import { useMemo, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const authCtxValue = useMemo(
    () => ({
      user: currentUser,
      setUser: (user) => {
        setCurrentUser(user);
      },
    }),
    [currentUser]
  );
  return (
    <AuthContext.Provider value={authCtxValue}>
      <div className="App">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route index element={<Home />} />
            <Route path="signup" element={<Register />}>
              <Route path="verifyOTP" element={<Register />}></Route>
            </Route>
            <Route path="login" element={<Login />}></Route>
            {/* <PrivateRoute roles={['admin']}></PrivateRoute> */}
            <Route path="upload" element={<UploadForm />} />
            <Route path="chat" element={<Chat />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
