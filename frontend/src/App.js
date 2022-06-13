import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import { Suspense, useMemo, useState, lazy } from "react";
import AuthContext from "./contexts/AuthContext.js";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";

const Home = lazy(() => import("./containers/Home"));
const UploadForm = lazy(() => import("./components/UploadForm/UploadForm"));
const Header = lazy(() => import("./components/Header/Header"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Info = lazy(() => import("./components/Info/Info"));
const NewsManager = lazy(() => import("./components/NewsManager/NewsManager"));
const AccountManager = lazy(() =>
  import("./components/AccountManager/AccountManager")
);

function App() {
  // Create localStorage.jwt to fake sign in
  const [currentUser, setCurrentUser] = useState(localStorage.jwt);

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
      <Suspense
        fallback={
          <Hypnosis
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "0",
              backgroundColor: "#222",
              zIndex: "9999",
            }}
          />
        }
      >
        <div className="App">
          <BrowserRouter>
            <Header></Header>

            <Routes>
              <Route index element={<Home />} />
              {/* <PrivateRoute roles={['admin']}></PrivateRoute> */}
              <Route path="upload" element={<UploadForm />} />
              <Route path="account" element={<Info />}>
                <Route index element={<AccountManager />} />
                <Route path="quan-li-tin" element={<NewsManager />} />
                <Route path="nap-tien" element={<NewsManager />} />
                <Route path="lich-su-nap-tien" element={<NewsManager />} />
              </Route>
            </Routes>

            <Footer></Footer>
          </BrowserRouter>
        </div>
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
