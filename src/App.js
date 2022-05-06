import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Explore from "./pages/Explore";
import PCNavbar from "./components/PCNavbar"
import MyAccount from "./pages/MyAccount";
import MyLearning from "./pages/MyLearning";
import ShoppingCart from "./pages/ShoppingCart";
import TeachingPortal from "./pages/TeachingPortal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import CreateCourse from "./pages/CreateCourse";


function App() {
  return (
    <>
    <Router>
      <PCNavbar />
      <Routes>
        <Route path = "/" element = {<Explore />}/>
        {/*will need to add in my account later */}
        <Route path = "/my-account" element = {<PrivateRoute />}>
          <Route path = "/my-account" element = {<MyAccount />}/>
        </Route>
        <Route path = "/sign-in" element = {<SignIn />}/>
        <Route path = "/sign-up" element = {<SignUp />}/>
        <Route path = "/forgot-password" element = {<ForgotPassword />}/>
        <Route path = "/my-learning" element = {<MyLearning />}/>
        <Route path = "/shopping-cart" element = {<ShoppingCart />}/>
        <Route path = "/teaching-portal" element = {<TeachingPortal />}/>
        <Route path = "/teaching-portal/create-course" element = {<CreateCourse />} />
      </Routes>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App