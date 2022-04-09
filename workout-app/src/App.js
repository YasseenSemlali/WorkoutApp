import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Statistics from "./pages/statistics";
import Home from "./pages/home";
import Graphs from "./pages/graphs";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/graphs" element={<Graphs />} />
      </Routes>
    </Router>
  );
}

export default App;
