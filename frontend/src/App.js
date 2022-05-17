import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./containers/Home";
import UploadForm from "./components/UploadForm/UploadForm";
<<<<<<< Updated upstream
import { useContext, useMemo, useState } from "react";
import AuthContext from "./contexts/AuthContext";

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
          <Routes>
            <Route index element={<Home />} />
            <Route path="signup" element={<Register />}>
              <Route path="verifyOTP" element={<Register />}></Route>
            </Route>
            <Route path="login" element={<Login />}></Route>
            {/* <PrivateRoute roles={['admin']}></PrivateRoute> */}
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

=======
import Chat from "./components/Chat/Chat";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* <Route index element={<Home />} /> */}
                    <Route path="signup" element={<Register />}>
                        <Route path="verifyOTP" element={<Register />}></Route>
                    </Route>
                    <Route path="login" element={<Login />}></Route>

                    {/* Path lồng nhau  */}
                    {/* <Route path="teams" element={<Teams />}>
                        <Route path=":teamId" element={<Team />} />
                        <Route path="new" element={<NewTeamForm />} />
                        <Route index element={<LeagueStandings />} />
                    </Route> */}
                    <Route path="upload" element={<UploadForm />} />
                    <Route path="chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>

            {/* <ProductItem id="1" src="https://img.thuephongtro.com/images/thumb/2020/04/29/20200429120046-0zgfo.jpg" title="dfdfdfdfd" desc="hello" /> */}
        </div>
    );
                  }
>>>>>>> Stashed changes
export default App;
