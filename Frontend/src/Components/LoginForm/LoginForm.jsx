import lg from "../../assets/img/Story Starter.svg"
import { NavLink, useNavigate } from "react-router-dom"
import "./loginForm.css"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../redux/actions/userActions"

const LoginForm = () => {
	const dispatch = useDispatch()
	const navegation = useNavigate()
	const [formLogin, setFormLogin] = useState({ username: "", password: "" })
	const [errorLogin, setErrorLogin] = useState(null)
	const [rememberMe, setRememberMe] = useState(false)

	const handleChangeInLogin = (e) => {
		const { name, value } = e.target
		setFormLogin({ ...formLogin, [name]: value })
	}

	const handleRememberMe = (e) => {
		setRememberMe(e.target.checked)
	}

	useEffect(() => {
		const storedEmail = localStorage.getItem("username")
		const storedPassword = localStorage.getItem("password")
		if (storedEmail && storedPassword) {
			setFormLogin({ username: storedEmail, password: storedPassword })
			setRememberMe(true)
		}
	}, [])

	useEffect(() => {
		if (rememberMe) {
			localStorage.setItem("username", formLogin.username)
			localStorage.setItem("password", formLogin.password)
		} else {
			localStorage.removeItem("username")
			localStorage.removeItem("password")
		}
	}, [rememberMe, formLogin])

	const handleLogin = () => {
		if (!formLogin.username || !formLogin.password) {
			setErrorLogin("Ingresa los datos correctamente")
			return
		}
		dispatch(login(formLogin))
			.then(() => {
				navegation("/")
			})
			.catch((err) => {
				console.log("No funco:", err)
				setErrorLogin("Fallo al iniciar sesion")
			})
	}

	return (
		<>
			<div className="login-container bg-body-tertiary d-flex flex-column align-items-center justify-content-center gap-5">
				<NavLink to="/" className="navbar-brand">
					<img src={lg} alt="Logo Login" />
				</NavLink>
				<div className="login-container-form">
					<h3 className="text-start pb-3">Iniciar Sesión</h3>
					<form className="d-flex flex-column justify-content-center gap-2">
						<div className="group-input">
							<input
								type="text"
								id="username-login"
								name="username"
								className="form-control"
								placeholder="Correo electrónico"
								onChange={handleChangeInLogin}
								autoComplete="username"
							/>
						</div>
						<div className="group-input">
							<input
								type="password"
								id="password"
								name="password"
								className="form-control"
								placeholder="Contraseña"
								onChange={handleChangeInLogin}
							/>
						</div>
						<a href="#" className="forgot-password">
							¿Olvidaste tu contraseña?
						</a>
						<button
							type="button"
							className="btn btn-create"
							onClick={() => handleLogin()}
						>
							Iniciar sesión
						</button>
						<div className="check-div">
							<input
								type="checkbox"
								id="remember-me"
								checked={rememberMe}
								onChange={handleRememberMe}
							/>
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
			<div className="errores-container">{errorLogin}</div>
		</>
	)
}

export default LoginForm
