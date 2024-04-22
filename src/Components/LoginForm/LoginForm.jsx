import lg from "../../assets/img/Story Starter.svg";
import { NavLink, useNavigate } from "react-router-dom";
import "./loginForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userActions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navegation = useNavigate();
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });
  const [errorLogin, setErrorLogin] = useState(null);

  const handleChangeInLogin = (e) => {
    const { name, value } = e.target;
    setFormLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formLogin.email || !formLogin.password) {
      setErrorLogin("Ingresa los datos correctamente");
      return;
    }

    dispatch(login(formLogin))
      .then(() => {
        navegation("/");
      })
      .catch((err) => {
        console.log("No funco:", err);
        setErrorLogin("Fallo al iniciar sesion");
      });
      console.log(errorLogin)
  };

  return (
    <>
      <div className="login-container bg-body-tertiary d-flex flex-column align-items-center justify-content-center gap-5">
        <NavLink to="/" className="navbar-brand">
          <img src={lg} alt="Logo Login" />
        </NavLink>
        <div>
          <h3 className="text-start pb-3">Iniciar Sesión</h3>
          <form
            className="d-flex flex-column justify-content-center gap-2"
            onSubmit={() => handleLogin()}
          >
            <div className="group-input">
              <input
                type="text"
                id="email-login"
                name="email"
                className="form-control"
                placeholder="Correo electrónico"
                onChange={handleChangeInLogin}
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
  );
};

export default LoginForm;
