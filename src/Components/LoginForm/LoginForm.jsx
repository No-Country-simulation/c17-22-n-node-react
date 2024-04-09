import "./loginForm.css"


const LoginForm = () => {
    return (
        <>
            <div className="login-container">
                <h3 className="text-center">Inicio de Sesion</h3>
                <form className="d-flex flex-column align-items-center p-5">
                    <div className="group-input">
                        <label htmlFor="user">Nombre de usuario:</label>
                        <input type="text" id="user" className="form-control" />
                    </div>
                    <div className="group-input">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-outline-success btn-create mt-3">Ingresar</button>
                </form>
            </div>
        </>
    )
}


export default LoginForm