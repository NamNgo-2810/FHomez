import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProductItem from "./components/ProductItem/ProductItem";
import Home from "./containers/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>

            {/* <Route index element={<Home />} />
            Path lồng nhau 
            <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <ProductItem id="1" src="https://img.thuephongtro.com/images/thumb/2020/04/29/20200429120046-0zgfo.jpg" title="dfdfdfdfd" desc="hello" /> */}

    </div>
  );
}

export default App;
