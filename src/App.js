import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Explore from "./pages/Explore";
import PCNavbar from "./components/PCNavbar"
import MyAccount from "./pages/MyAccount";
import MyLearning from "./pages/MyLearning";
import ShoppingCart from "./pages/ShoppingCart";
import TeachingPortal from "./pages/TeachingPortal";
import { ToastContainer, toast } from 'react-toastify';
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";


function App() {
  return (
    <>
    <Router>
      <PCNavbar />
      <Routes>
        <Route path = "/" element = {<Explore />}/>
        {/*will need to add in my account later */}
        <Route path = "/my-account" element = {<SignIn />}/>
        <Route path = "/sign-in" element = {<SignIn />}/>
        <Route path = "/sign-up" element = {<SignUp />}/>
        <Route path = "/forgot-password" element = {<ForgotPassword />}/>
        <Route path = "/my-learning" element = {<MyLearning />}/>
        <Route path = "/shopping-cart" element = {<ShoppingCart />}/>
        <Route path = "/teaching-portal" element = {<TeachingPortal />}/>
      </Routes>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App