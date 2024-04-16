import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import lg from "../../assets/img/Story Starter.svg"
import imgNavBar from "../../assets/img/menu.png"
import jsonData from "../../assets/BDdemo/db.json";
import lupa from "../../assets/img/lupa.png"
import "./navBar.css"



const NavBar = () =>{
    const [search, setSearch] = useState("")
    const proyects = jsonData;

    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }


    const close = () =>{
        setSearch("")
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
        if (title.length > 40) {
            return title.substring(0, 40) + "...";
        } else {
            return title;
        }
    };


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <NavLink to="/" className="navbar-brand"><img src={lg} alt="Logo" /></NavLink>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <img src={imgNavBar} alt="Imagen Menu" />
                </button>
                
                <div className="collapse navbar-collapse containerNav" id="navbarSupportedContent">
                    <form>
                            <img src={lupa} alt="Lupa" className="lupa-icon" />
                            <input value={search} onChange={handleSearch} className="form-control me-1" type="text" placeholder="Buscar" aria-label="Search" />
                            {
                            results.length != 0 && <article className='containerResults'>
                                        <section>
                                            {
                                            results.map((proyect, index) => (
                                                index < 8 && <div key={proyect.id}>
                                                    <Link to={`/proyect/${proyect.id}`} className="dropdown-item" onClick={close}>{lengthOfTitle(proyect.title)}</Link>
                                                </div>
                                            ))
                                            }
                                        </section>
                                    </article>
                            }
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
        </nav>
    )
}


export default NavBar