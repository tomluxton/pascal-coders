import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Explore from "./pages/Explore";
import PCNavbar from "./components/PCNavbar"
import MyAccount from "./pages/MyAccount";
import MyLearning from "./pages/MyLearning";
import ShoppingCart from "./pages/ShoppingCart";
import TeachingPortal from "./pages/TeachingPortal";


function App() {
  return (
    <>
    <Router>
      <PCNavbar />
      <Routes>
        <Route path = "/" element = {<Explore />}/>
        <Route path = "/my-account" element = {<MyAccount />}/>
        <Route path = "/my-learning" element = {<MyLearning />}/>
        <Route path = "/shopping-cart" element = {<ShoppingCart />}/>
        <Route path = "/teaching-portal" element = {<TeachingPortal />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App