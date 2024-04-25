import { NavLink, useNavigate } from "react-router-dom"
import lg from "../../assets/img/Story Starter.svg"
import imgNavBar from "../../assets/img/menu.png"
import lupa from "../../assets/img/lupa.png"
import { useDispatch } from "react-redux"
import { filterProjectByName } from "../../redux/actions/projectActions"
import "./navBar.css"

const NavBar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleChange = async (e) => {
		e.preventDefault()
		const searchString = e.target.value
		await dispatch(filterProjectByName(searchString))
		navigate("/projectsView")
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<NavLink to="/" className="navbar-brand">
				<img src={lg} alt="Logo" />
			</NavLink>

			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<img src={imgNavBar} alt="Imagen Menu" />
			</button>

			<div
				className="collapse navbar-collapse containerNav"
				id="navbarSupportedContent"
			>
				<form onSubmit={handleSubmit}>
					<img src={lupa} alt="Lupa" className="lupa-icon" />
					<input
						onChange={(e) => handleChange(e)}
						className="form-control me-1"
						type="search"
						placeholder="Buscar"
					/>
				</form>

				<ul className="navbar-nav">
					<li>
						<NavLink to="/login" className="nav-link efectoBoton">
							iniciar Sesion
						</NavLink>
					</li>

					<li>
						<NavLink to="/register" className="nav-link efectoBoton">
							Registrarse
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar
