import { Link, NavLink } from 'react-router-dom'
import lg from "../../assets/img/Story Starter.svg"
import imgNavBar from "../../assets/img/menu.png"
import { useState } from 'react'
import "./navBar.css"


const NavBar = () =>{
    const [search, setSearch] = useState("")

    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }

    const proyects = [{id:1,title:"Hi"},{id:2,title:"Bye"},{id:3,title:"Good"}, {id:4,title:"Hello"}]

    let results = []
    if(!search){
        results = []
    }
    else{
        results = proyects.filter( (data) =>
            data.title.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }


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
                                { results.map( (proyect) => (
                                        <div key={proyect.id}>
                                            <Link to={`/proyect/${proyect.id}`} className="efectoBoton">{proyect.title}</Link>
                                        </div>
                                        ))
                                }
                                { results.length === 0 && search.length > 0 && (
                                        <div>
                                            <p>Busque el título de un proyecto existente</p>
                                        </div>
                                    )
                                }
                        </div>
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