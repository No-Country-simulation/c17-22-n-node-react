import "./EditProfile.css"
import { useEffect, useState } from "react"
import { uploadImg } from "../../utils/uploadImg"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById, updateUser } from "../../redux/actions/userActions"
import Error404 from "../Error404/Error404"
import cargarImagen from "../../assets/img/cargarImagen.jpg"

const EditProfile = () => {
	const { userId } = useParams()
	const dispatch = useDispatch()
	const navegation = useNavigate()
	const isAuth = useSelector((state) => state.userLogged)

	const token = useSelector((state) => state.token)

	const currentUser = useSelector((state) =>
		state.users.find((u) => u.userId === userId)
	)

	const [profile, setProfile] = useState({
		name: "",
		email: "",
		imageUrl: "",
		instagramUrl: "",
	})

	useEffect(() => {
		dispatch(getUserById(userId))
	}, [dispatch, userId])

	useEffect(() => {
		if (currentUser) {
			setProfile({
				name: currentUser.name,
				email: currentUser.email,
				imageUrl: currentUser.imageUrl,
				instagramUrl: currentUser.instagramUrl,
			})
		}
	}, [currentUser])

	const handleImageProfile = async (e) => {
		const imgProfile = await uploadImg(e)
		setProfile({ ...profile, imageUrl: imgProfile })
	}

	const handleDeleteImage = () => {
		setProfile({ ...profile, imageUrl: "" })
	}

	const handleChangeProfile = (e) => {
		const { name, value } = e.target
		setProfile({ ...profile, [name]: value })
	}

	const handleProfile = () => {
		dispatch(updateUser(userId, profile, token))
	}

	const deleteUser = () => {
		dispatch(deleteUser(userId, token)).then(navegation("/"))
	}

	if (!currentUser && !isAuth) {
		return <Error404 />
	}

	return (
		<>
			<div className="edit-profile-container bg-body-tertiary">
				<h3 className="text-center">Editar Perfil</h3>
				<form className="profile-form">
					<div>
						<div className="image-container-profile">
							{profile.imageUrl ? (
								<img
									src={profile.imageUrl}
									className="show-img-profile"
									alt="Imagen seleccionada"
								/>
							) : (
								<img
									src={cargarImagen}
									className="show-img-profile"
									alt="Imagen seleccionada"
								/>
							)}
							{profile.imageUrl && (
								<button onClick={handleDeleteImage} className="btn btn-danger">
									Eliminar Imagen
								</button>
							)}
						</div>
						{!profile.imageUrl && (
							<div
								className="group-input-profile"
								style={{ height: "2.45rem" }}
							>
								<input
									type="file"
									id="img-profile"
									name="imageUrl"
									className="form-control input-profile"
									onChange={handleImageProfile}
								/>
							</div>
						)}
					</div>
					<div className="group-input-profile">
						<label htmlFor="name">Nombre:</label>
						<input
							type="text"
							id="name"
							name="name"
							className="form-control input-profile"
							placeholder="Nombre"
							value={profile.name}
							onChange={handleChangeProfile}
						/>
					</div>
					<div className="group-input-profile">
						<label htmlFor="name-profile">Email:</label>
						<input
							type="text"
							id="name-profile"
							className="form-control input-profile"
							name="email"
							placeholder="Email"
							value={profile.email}
							onChange={handleChangeProfile}
						/>
					</div>
					<div className="group-input-profile">
						<label htmlFor="instagramUrl-profile">Url de Instagram:</label>
						<input
							type="text"
							id="instagramUrl-profile"
							className="form-control input-profile"
							name="instagramUrl"
							value={profile.instagramUrl}
							placeholder="Url Instagram"
							onChange={handleChangeProfile}
						/>
					</div>

					<button
						type="button"
						className="btn efectoBoton"
						onClick={() => handleProfile()}
					>
						Guardar Cambios
					</button>
				</form>
				<div className="danger-zone">
					<h4>Zona de peligro!</h4>
					<p>Tu cuenta se borrara cuando hagas click en el boton</p>
					<button className="btn btn-danger" onClick={() => deleteUser()}>
						Borrar Cuenta
					</button>
				</div>
			</div>
		</>
	)
}

export default EditProfile
