import "./Categories.css"

export const CategoriesBar = () => {

    return (
        <div className="container">
            <h4 className="titleCat"><b>Categorías</b></h4>
            <div className="container text-center">
                <div className="row">

                {/* -------------------------------------------------------------------------------- */}
                    <div className="col">  
                        <div className="btn-group">
                            <button type="button" className="btn btn-secondary-subtle border border-0"><b>Cine</b></button>
                            <button type="button" className="btn btn-secondary-subtle dropdown-toggle dropdown-toggle-split border border-0 flecha" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu dropdrownMenu">
                            <li><h6 className="dropdown-header dropdownHeader">Subcategorías</h6></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Comedia</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Terror</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Historia</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Deportes</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Mitologia</a></li>
                            </ul>
                        </div>
                    </div>
                

                {/* -------------------------------------------------------------------------------- */}

                <div className="col">  
                        <div className="btn-group">
                            <button type="button" className="btn btn-secondary-subtle border border-0"><b>Libros</b></button>
                            <button type="button" className="btn btn-secondary-subtle dropdown-toggle dropdown-toggle-split border border-0 flecha" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu dropdrownMenu">
                            <li><h6 className="dropdown-header dropdownHeader">Subcategorías</h6></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Comedia</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Terror</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Historia</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Deportes</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Mitologia</a></li>
                            </ul>
                        </div>
                    </div>

                {/* -------------------------------------------------------------------------------- */}
                
                <div className="col">  
                        <div className="btn-group">
                            <button type="button" className="btn btn-secondary-subtle border border-0"><b>Videojuegos</b></button>
                            <button type="button" className="btn btn-secondary-subtle dropdown-toggle dropdown-toggle-split border border-0 flecha" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu dropdrownMenu">
                            <li><h6 className="dropdown-header dropdownHeader">Subcategorías</h6></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Comedia</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Terror</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Historia</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Deportes</a></li>
                                <li><a className="dropdown-item dropdownItem" href="#">Mitologia</a></li>
                            </ul>
                        </div>
                    </div>
                
                {/* -------------------------------------------------------------------------------- */}

                </div>
            </div>
        </div>
    )
}