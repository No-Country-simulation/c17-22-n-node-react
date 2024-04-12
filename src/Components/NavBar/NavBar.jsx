import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import lg from "../../assets/img/Story Starter.svg"
import imgNavBar from "../../assets/img/menu.png"
import jsonData from "../../../db.json";
import "./navBar.css"



const NavBar = () =>{
    const [search, setSearch] = useState("")
    const proyects = jsonData;

    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }


    let results = []
    if(!search){
        results = []
    }
    else{
        results = proyects.filter( (data) =>
            data.title.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }


    const lengthOfTitle = (title) => {
        if (title.length > 29) {
            return title.substring(0, 29) + "...";
        } else {
            return title;
        }
    };


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand"><img src={lg} alt="Logo" /></NavLink>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <img src={imgNavBar} alt="Imagen Menu" />
                </button>
                
                <div className="collapse navbar-collapse containerNav" id="navbarSupportedContent">
                    <form className="d-flex" role="search">
                        <input value={search} onChange={handleSearch} className="form-control me-1" type="text" placeholder="Buscar" aria-label="Search" />
                        
                        <div className="input-group">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    Resultados
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {
                                    results.map((proyect, index) => (
                                        index < 8 && <li key={proyect.id}>
                                            <Link to={`/proyect/${proyect.id}`} className="dropdown-item">{lengthOfTitle(proyect.title)}</Link>
                                        </li>
                                    ))
                                    }
                                    {
                                        results.length === 0 && (
                                            <li>
                                                <p>Escribi un titulo existente</p>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </form>
                    
                    <ul className="navbar-nav">
                        <li>
                            <NavLink to="/login" className="nav-link efectoBoton">iniciar Sesion</NavLink>
                        </li>
                        
                        <li>
                            <NavLink to="/register" className="nav-link efectoBoton">Registrarse</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


export default NavBar