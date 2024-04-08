import { NavLink } from 'react-router-dom'
import lg from "../../assets/img/lg.png"
import imgNavBar from "../../assets/img/menu.png"
import "./navBar.css"


const NavBar = () =>{
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand"><img src={lg} alt="Logo" /></NavLink>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <img src={imgNavBar} alt="Imagen Menu" />
                </button>
                
                <div className="collapse navbar-collapse containerNav" id="navbarSupportedContent">
                    <form className="d-flex" role="search">
                        <input className="form-control me-1" type="search" placeholder={"Buscar"} aria-label="Search" />
                        <button type="submit" className="btn btn-outline-success">Buscar</button>
                    </form>
                    
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link efectoBoton">iniciar Sesion</NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link efectoBoton">Registrarse</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


export default NavBar