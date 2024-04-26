import "./User.css"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Error404 from "../Error404/Error404"
import { getUserById } from "../../redux/actions/userActions"
import { getProjects } from "../../redux/actions/projectActions"
import ig from "../../assets/img/instagram.svg"

const User = () => {
	const { userId } = useParams()
	const dispatch = useDispatch()
	const isAuth = useSelector((state) => state.userLogged)

	const userDetail = useSelector((state) => state.userDetail)
	const projects = useSelector((state) => state.projectsOnScreen)

	useEffect(() => {
		dispatch(getUserById(userId))
		dispatch(getProjects())
	}, [dispatch])

	const ofTheUser = projects.filter((d) => d.entrepreneurId === userId)

	if (Object.keys(userDetail).length === 0) {
		return <Error404 />
	}

	return (
		<>
			<div className="d-flex flex-column bg-body-tertiary justify-content-center align-items-center">
				<div className="user-container d-flex gap-5 bg-body-tertiary justify-content-center align-items-center mt-3">
					<img
						src={userDetail.imageUrl}
						alt="User profile"
						className="img-fluid"
					/>
					<div className="user-info">
						<div className="d-flex align-items-center gap-4">
							<h2> {userDetail.name} </h2>
							{isAuth ? (
								<Link className="edit-btn efectoBoton" to={"/edit-profile"}>
									Editar Perfil
								</Link>
							) : (
								""
							)}
						</div>
						{userDetail.instagramUrl ? (
							<a href={userDetail.instagramUrl} target="_blank">
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
