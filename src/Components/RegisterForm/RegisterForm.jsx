import { NavLink } from "react-router-dom";
import lg from "../../assets/img/Story Starter.svg";
import "./registerForm.css";

const RegisterForm = () => {
  return (
    <>
      <div className="login-container bg-body-tertiary d-flex flex-column align-items-center justify-content-center gap-5">
        <NavLink to="/" className="navbar-brand">
          <img src={lg} alt="Logo Register" />
        </NavLink>
        <div>
        <p className="text-end small">¿Tines una cuenta? <NavLink to="/login" style={{textDecoration: 'none'}}>Ingresar</NavLink></p>
          <h3 className="text-start pb-3">Registrarme</h3>
          <form className="d-flex flex-column justify-content-center gap-2">
            <div className="group-input ">
              <input
                type="text"
                id="user"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="group-input">
              <input
                type="email"
                id="email-register"
                className="form-control"
                placeholder="Email"
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
            <div className="group-input">
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Repetir contraseña"
              />
            </div>
            <div className="group-radio-input">
              <input
                type="radio"
                id="type-of-acount-inversor"
                name="type-of-acount"
                value="inversor"
              />
              <label
                htmlFor="type-of-acount-inversor"
                className="check-remember"
              >
                Quiero ingresar como INVERSOR
              </label>
            </div>
            <div className="group-radio-input">
              <input
                type="radio"
                id="type-of-acount-emprendedor"
                name="type-of-acount"
                value="emprendedor"
              />
              <label
                htmlFor="type-of-acount-emprendedor"
                className="check-remember"
              >
                Quiero ingresar como EMPRENDEDOR
              </label>
            </div>
            <button type="submit" className="btn btn-create">
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
    </>
  );
};

export default RegisterForm;
