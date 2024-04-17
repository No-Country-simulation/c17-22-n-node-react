import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../Components/NavBar/NavBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import LoginForm from "../Components/LoginForm/LoginForm.jsx";
import RegisterForm from "../Components/RegisterForm/RegisterForm.jsx";
import Home from "../pages/Home/Home.jsx";
import Error404 from "../Components/Error404/Error404.jsx";
import ViewProyect from "../Components/ViewProyect/ViewProyect.jsx";

const Router = () => {
    
  const location = useLocation();
  const showNavbarAndFooter = () => !["/login", "/register"].includes(location.pathname);
  
  return (
    <>
      {showNavbarAndFooter() && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/proyect/:proyectId" element={<ViewProyect />} />

        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/register" element={<RegisterForm />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
      {showNavbarAndFooter() && <Footer />}
    </>
  );
};

export default Router;
