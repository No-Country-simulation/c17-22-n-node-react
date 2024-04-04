import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Navbar from '../Components/NavBar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import LoginForm from "../Components/LoginForm/LoginForm.jsx";
import RegisterForm from "../Components/RegisterForm/RegisterForm.jsx"
import Home from "../Components/Home/Home.jsx"
import Error404 from "../Components/Error404/Error404.jsx"


const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
                <Routes>                    
                    <Route exact path="/" element={<Home/>} />
                    
                    <Route exact path="/login" element={<LoginForm/>} />
                    
                    <Route exact path="/register" element={<RegisterForm/>} />
                    
                    <Route path='*' element={<Error404/>} />
                </Routes>
            <Footer />
        </BrowserRouter>
    )
}


export default Router