import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { Suspense, useMemo, useState, lazy } from "react";
import AuthContext from "./contexts/AuthContext.js";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const Home = lazy(() => import("./containers/Home"));
const Admin = lazy(() => import("./components/Admin/Admin"));
const UploadForm = lazy(() => import("./components/UploadForm/UploadForm"));
const ProductDetail = lazy(() =>
  import("./components/ProductDetail/ProductDetail")
);
const Header = lazy(() => import("./components/Header/Header"));
const Info = lazy(() => import("./components/Info/Info"));
const AccountManager = lazy(() =>
  import("./components/AccountManager/AccountManager")
);
const PostManager = lazy(() =>
  import("./components/AccountManager/PostManager")
);

const ChargeMoney = lazy(() =>
  import("./components/AccountManager/ChargeMoney")
);
const ChargeHistory = lazy(() =>
  import("./components/AccountManager/ChargeHistory")
);
const VerifyPost = lazy(() => import("./components/Admin/VerifyPost"));
const VerifyUser = lazy(() => import("./components/Admin/VerifyUser"));
const ManageUser = lazy(() => import("./components/Admin/ManageUser"));
const VerifyAccount = lazy(() =>
  import("./components/AccountManager/VerifyAccount")
);
const Chat = lazy(() => import("./components/Chat/Chat"));

function App() {
  const [currentUser, setCurrentUser] = useState(
    localStorage.user && JSON.parse(localStorage.user)
  );

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
              <Route path="admin" element={<PrivateRoute roles={["admin"]} />}>
                <Route element={<Admin />}>
                  <Route index element={<AccountManager />}></Route>
                  <Route path="duyet-bai-dang" element={<VerifyPost />}></Route>
                  <Route
                    path="xac-thuc-nguoi-dung"
                    element={<VerifyUser />}
                  ></Route>
                  <Route
                    path="quan-li-nguoi-dung"
                    element={<ManageUser />}
                  ></Route>
                </Route>
              </Route>
              <Route
                path="products/:productId"
                element={<ProductDetail />}
              ></Route>
              <Route
                path="upload"
                element={<PrivateRoute roles={["admin", "owner"]} />}
              >
                <Route index element={<UploadForm />}></Route>
              </Route>
              <Route
                path="chat"
                element={<PrivateRoute roles={["admin", "owner", "hirer"]} />}
              >
                <Route index element={<Chat />} />
              </Route>

              <Route
                path="account"
                element={<PrivateRoute roles={["admin", "owner", "hirer"]} />}
              >
                <Route element={<Info />}>
                  <Route index element={<AccountManager />} />
                  <Route
                    path="xac-thuc-tai-khoan"
                    element={<VerifyAccount />}
                  />
                  <Route path="quan-li-tin" element={<PostManager />} />
                  <Route path="nap-tien" element={<ChargeMoney />} />
                  <Route path="lich-su-nap-tien" element={<ChargeHistory />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
