import lg from "../../assets/img/Story Starter.svg"
import { NavLink } from "react-router-dom"
import "./loginForm.css"

const LoginForm = () => {
	return (
		<>
			<div className="login-container bg-body-tertiary d-flex flex-column align-items-center justify-content-center gap-5">
				<NavLink to="/" className="navbar-brand">
					<img src={lg} alt="Logo Login" />
				</NavLink>
				<div>
					<h3 className="text-start pb-3">Iniciar Sesión</h3>
					<form className="d-flex flex-column justify-content-center gap-2">
						<div className="group-input">
							<input
								type="text"
								id="user"
								className="form-control"
								placeholder="Correo electrónico"
							/>
						</div>
						<div className="group-input">
							<input
								type="password"
								id="password"
								className="form-control"
								placeholder="Contraseña"
							/>
						</div>
						<a href="#" className="forgot-password">
							¿Olvidaste tu contraseña?
						</a>
						<button type="submit" className="btn btn-create">
							Iniciar sesión
						</button>
						<div className="check-div">
							<input type="checkbox" id="remember-me" />
							<label htmlFor="remember-me" className="check-remember">
								Recordarme
							</label>
						</div>
					</form>
				</div>
				<span className="link-new-user">
					¿Nuevo usuario en Story Starter?{" "}
					<NavLink to="/register">¡Registrarme!</NavLink>
				</span>
			</div>
		</>
	)
}

export default LoginForm
