import "./registerForm.css"

const RegisterForm = () => {
    return (
        <>
            <div className="register-container">
                <h3 className="text-center">Registro</h3>
                <form className="d-flex flex-column align-items-center">
                    <div className="group-input ">
                        <label htmlFor="user">Nombre de Usuario</label>
                        <input type="text" id="user"  className="form-control"/>
                    </div>
                    <div className="group-input">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email"  className="form-control"/>
                    </div>
                    <div className="group-input">
                        <label htmlFor="birth-date">Fecha de Nacimiento</label>
                        <input type="date" id="birth-date" className="form-control"/>
                    </div>
                    <div className="group-input">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="form-control"/>
                    </div>
                    <div className="group-input">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input type="password" id="confirmPassword" className="form-control"/>
                    </div>
                    <div className="group-input">
                        <label htmlFor="">Emprendedor</label>
                        <input type="radio" name="typeOfAcount" />
                        <label htmlFor="">Inversor</label>
                        <input type="radio" name="typeOfAcount" />
                    </div>
                    <button type="submit" className="btn btn-outline-success btn-create">Crear Cuenta</button>
                </form>
            </div>
        </>
    )
}


export default RegisterForm