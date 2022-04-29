import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UploadForm from "./components/UploadForm/UploadForm";

function App() {
    return (
        <div className="App">
            {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            Path lồng nhau 
            <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter> */}
            <UploadForm></UploadForm>
        </div>
    );
}

export default App;
