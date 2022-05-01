import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Explore from "./pages/Explore";
import PCNavbar from "./components/PCNavbar"


function App() {
  return (
    <>
    <Router>
      <PCNavbar />
      <Routes>
        <Route path = "/" element = {<Explore />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App