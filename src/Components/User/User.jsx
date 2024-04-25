import "./User.css"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Error404 from "../Error404/Error404"
import { getUsers } from "../../redux/actions/userActions"
import { getProjects } from "../../redux/actions/projectActions"
import ig from "../../assets/img/instagram.svg"

const User = () => {
	const { userId } = useParams()
	const dispatch = useDispatch()
	const isAuth = useSelector((state) => state.userLogged)

	const users = useSelector((state) => state.users)
	const projects = useSelector((state) => state.projectsOnScreen)

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProjects());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const user = users.filter((d) => d.userId === userId);
  const ofTheUser = projects.filter((d) => d.entrepreneurId === userId);

	if (user.length === 0) {
		return <Error404 />
	}

	return (
		<>
			<div className="d-flex flex-column bg-body-tertiary justify-content-center align-items-center">
				<div className="user-container d-flex gap-5 bg-body-tertiary justify-content-center align-items-center mt-3">
					<img
						src={user[0].imageUrl}
						alt="User profile"
						className="img-fluid"
					/>
					<div className="user-info">
						<div className="d-flex align-items-center gap-4">
							<h2> {user[0].username} </h2>
							{isAuth ? (
								<Link className="edit-btn efectoBoton" to={"/edit-profile"}>
									Editar Perfil
								</Link>
							) : (
								""
							)}
						</div>
						{user[0].instagramUrl ? (
							<a href={user[0].instagramUrl} target="_blank">
								<img className="ig-logo-user" src={ig} alt="img Instagram" />
							</a>
						) : (
							""
						)}
					</div>
				</div>
				<div>
					<h5 className="text-center my-4">Projectos Creados</h5>
					<div className="container text-center d-flex gap-5">
						{ofTheUser.length === 0 ? (
							<p className="without-projects">
								Este usuario no tiene ningun proyecto
							</p>
						) : (
							ofTheUser.map((p) => {
								return (
									<Link
										to={`/project/${p.entrepreneurshipId}`}
										className="user-projects-card"
										key={p.entrepreneurId}
									>
										<h4>{p.name}</h4>
										<img src={p.image} alt="" className="img-fluid" />
										<p>Ver Proyecto</p>
									</Link>
								)
							})
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default User
