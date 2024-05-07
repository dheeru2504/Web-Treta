import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./output.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./pages/Homepage";
import AddEmployee from "./pages/AddEmployee";
// import CreateTeam from "./pages/CreateTeam";

// import TeamsPage from "./pages/TeamsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add_employee" element={<AddEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
