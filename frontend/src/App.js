import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
const Footer = lazy(() => import("./components/Footer/Footer"));
const Info = lazy(() => import("./components/Info/Info"));
const NewsManager = lazy(() => import("./components/NewsManager/NewsManager"));
const AccountManager = lazy(() =>
    import("./components/AccountManager/AccountManager")
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
                            <Route
                                path="admin"
                                element={<PrivateRoute roles={["admin"]} />}
                            >
                                <Route index element={<Admin />}></Route>
                            </Route>
                            <Route
                                path="products/:productId"
                                element={<ProductDetail />}
                            ></Route>
                            <Route
                                path="upload"
                                element={
                                    <PrivateRoute roles={["admin", "owner"]} />
                                }
                            >
                                <Route index element={<UploadForm />}></Route>
                            </Route>
                            <Route
                                path="chat"
                                element={
                                    <PrivateRoute
                                        roles={["admin", "owner", "hirer"]}
                                    />
                                }
                            >
                                <Route index element={<Chat />}></Route>
                            </Route>

                            <Route
                                path="account"
                                element={
                                    <PrivateRoute
                                        roles={["admin", "owner", "hirer"]}
                                    />
                                }
                            >
                                <Route element={<Info />}>
                                    <Route index element={<AccountManager />} />
                                    <Route
                                        path="quan-li-tin"
                                        element={<NewsManager />}
                                    />
                                    <Route
                                        path="nap-tien"
                                        element={<NewsManager />}
                                    />
                                    <Route
                                        path="lich-su-nap-tien"
                                        element={<NewsManager />}
                                    />
                                </Route>
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
