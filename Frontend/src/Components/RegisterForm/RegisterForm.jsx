import { NavLink, useNavigate } from "react-router-dom"
import lg from "../../assets/img/Story Starter.svg"
import "./registerForm.css"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { addUser } from "../../redux/actions/userActions"

const RegisterForm = () => {
	const dispatch = useDispatch()
	const navegation = useNavigate()
	const [formRegister, setFormRegister] = useState({
		username: "",
		email: "",
		password: "",
		passwordRepeat: "",
		investor: null,
	})
	const [errorRegister, setErrorRegister] = useState(null)

	const handleChangeRegister = (e) => {
		const { name, value, type } = e.target

		if (type === "radio") {
			const radioValue =
				value === "true" ? true : value === "false" ? false : null
			if (radioValue === null) {
				setErrorRegister("El valor del radio es null")
			} else {
				setFormRegister((prev) => ({ ...prev, [name]: radioValue }))
			}
		} else {
			setFormRegister((prev) => ({ ...prev, [name]: value }))
		}
	}

	const handleRegister = () => {
		if (
			!formRegister.username ||
			!formRegister.email ||
			!formRegister.password ||
			!formRegister.passwordRepeat ||
			formRegister.investor === null ||
			formRegister.investor === undefined
		) {
			setErrorRegister("Por favor, completa todos los campos.")
			return
		}

		if (formRegister.password !== formRegister.passwordRepeat) {
			setErrorRegister("La contraseñas no coinciden")
			return
		}

		if (formRegister.password < 8) {
			setErrorRegister("La contraseña debe tener al menos 8 caracteres.")
			return
		}

		const newUser = {
			username: formRegister.username,
			password: formRegister.password,
			email: formRegister.email,
			investor: formRegister.investor,
		}

		dispatch(addUser(newUser))
			.then(() => {
				navegation("/login")
			})
			.catch((err) => {
				console.log(err)
				setErrorRegister("Ocurrio un fallo al registrar al usuario")
			})
		console.log(errorRegister)
	}

	return (
		<>
			<div className="login-container bg-body-tertiary d-flex flex-column align-items-center justify-content-center gap-3">
				<NavLink to="/" className="navbar-brand">
					<img src={lg} alt="Logo Register" />
				</NavLink>
				<div className="register-container-form">
					<p className="text-end small">
						¿Tines una cuenta?{" "}
						<NavLink to="/login" style={{ textDecoration: "none" }}>
							Ingresar
						</NavLink>
					</p>
					<h3 className="text-start pb-3">Registrarme</h3>
					<form className="d-flex flex-column justify-content-center align-items-center gap-2">
						<div className="group-input ">
							<input
								type="text"
								id="username"
								name="username"
								className="form-control"
								placeholder="Nombre"
								onChange={handleChangeRegister}
							/>
						</div>
						<div className="group-input">
							<input
								type="email"
								name="email"
								autoComplete="email"
								id="email-register"
								className="form-control"
								placeholder="Email"
								onChange={handleChangeRegister}
							/>
						</div>
						<div className="group-input">
							<input
								type="password"
								id="password"
								name="password"
								className="form-control"
								placeholder="Contraseña"
								onChange={handleChangeRegister}
							/>
						</div>
						<div className="group-input">
							<input
								type="password"
								name="passwordRepeat"
								id="confirmPassword"
								className="form-control"
								placeholder="Repetir contraseña"
								onChange={handleChangeRegister}
							/>
						</div>
						<div className="toggle-container-toa">
							<p>Quiero ingresar como:</p>
							<div className="toggle-radio-toa">
								<input
									type="radio"
									value="true"
									name="investor"
									checked={formRegister.investor === true}
									id="toggle-toa-investor"
									onChange={handleChangeRegister}
								/>
								<label htmlFor="toggle-toa-investor">Inversor</label>
								<input
									onChange={handleChangeRegister}
									value="false"
									checked={formRegister.investor === false}
									type="radio"
									name="investor"
									id="toggle-toa-entreprenour"
								/>
								<label htmlFor="toggle-toa-entreprenour">Emprendedor</label>
							</div>
						</div>
						<button
							type="button"
							className="btn btn-create"
							onClick={() => handleRegister()}
						>
							Crear Cuenta
						</button>
						<div className="info-links-register">
							<span>
								Al registrarte, aceptas nuestra{" "}
								<a href="#">Política de privacidad</a>,{" "}
								<a href="#">Politica de cookies</a> y los{" "}
								<a href="#">Términos de uso</a>
							</span>
						</div>
					</form>
				</div>
			</div>
			<div className="errores-container">{errorRegister}</div>
		</>
	)
}

export default RegisterForm
