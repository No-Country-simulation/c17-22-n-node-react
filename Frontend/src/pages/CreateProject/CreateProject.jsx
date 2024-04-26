import { useEffect, useState } from "react"
import validation from "../../utils/validations/createProject"
import { useDispatch, useSelector } from "react-redux"

import { uploadImg } from "../../utils/uploadImg"
import cargarImagen from "../../assets/img/cargarImagen.jpg"
import "./createproject.css"
import { addProject } from "../../redux/actions/projectActions"
import { getCategories } from "../../redux/actions/categoriesActions"
import { getSubcategories } from "../../redux/actions/subcategoriesActions"

export const CreateProject = () => {
	const dispatch = useDispatch()

	/* ESTADOS ------------------------------------------------------- */
	const categories = useSelector((state) => state.categories)
	const subCategories = useSelector((state) => state.subCategories)
	const allProjects = useSelector((state) => state.allProjects)
	const token = useSelector((state) => state.token)

	const [newProject, setNewProject] = useState({
		name: "",
		description: "",
		categoryId: "",
		subcategoryId: "",
		imageUrl: "",
		entrepreneurId: "",
	})

	const [errors, setErrors] = useState({
		name: "",
		description: "",
		categoryId: "",
		subcategoryId: "",
		imageUrl: "",
		entrepreneurId: "",
	})

	const [projectCreatedSuccessfully, setProjectCreatedSuccessfully] =
		useState(false)
	const [projectExists, setProjectExists] = useState(false)
	const [missingData, setMissingData] = useState(false)

	/* HANDLERS ------------------------------------------------------- */

	const handleImg = async (e) => {
		const newImage = await uploadImg(e)
		setNewProject({ ...newProject, imageUrl: newImage })
		setErrors(validation({ ...newProject, imageUrl: newImage }))
	}

	const deleteImg = () => {
		setNewProject({ ...newProject, imageUrl: "" })
	}

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setNewProject({ ...newProject, [name]: value })
		setErrors(validation({ ...newProject, [name]: value }))
	}

	const handleSubmit = async (e) => {
		const searchProject = allProjects.some(
			(Project) => Project.name === newProject.name
		)
		const completeData =
			newProject.name &&
			newProject.description &&
			newProject.categoryId &&
			newProject.subcategoryId &&
			newProject.imageUrl &&
			newProject.entrepreneurId

		if (
			!newProject.name ||
			!newProject.description ||
			!newProject.categoryId ||
			!newProject.subcategoryId ||
			!newProject.imageUrl ||
			!newProject.entrepreneurId
		) {
			e.preventDefault()
			setProjectExists(false)
			setMissingData(true)
		}

		if (searchProject) {
			e.preventDefault()
			setMissingData(false)
			setProjectExists(true)
		}

		if (!searchProject && completeData) {
			e.preventDefault()
			dispatch(addProject(newProject, token))
			setProjectCreatedSuccessfully(true)
		}
	}

	useEffect(() => {
		dispatch(getCategories())
		dispatch(getSubcategories())
		window.scrollTo(0, 0)
	}, [dispatch])

	if (!projectCreatedSuccessfully) {
		return (
			<div className="container d-flex justify-content-center align-items-center my-5">
				<div className="bg-body-tertiary p-5 rounded">
					<h3 className="mb-4">Empezá tu proyecto</h3>
					<form className="needs-validation" noValidate onSubmit={handleSubmit}>
						<div className="form-floating mb-4">
							<input
								type="text"
								className="form-control inputCP"
								id="floatingInput"
								placeholder="Titulo"
								name="name"
								value={newProject.name}
								onChange={handleChange}
							/>
							<label htmlFor="floatingInput">Titulo</label>
							<p className="text-danger">{errors.name}</p>
						</div>

						<div className="form-floating mb-4">
							<textarea
								className="form-control"
								placeholder="Descripción"
								id="floatingTextarea"
								name="description"
								value={newProject.description}
								onChange={handleChange}
							></textarea>
							<label htmlFor="floatingTextarea">Descripción</label>
							<p className="text-danger">{errors.description}</p>
						</div>

						<div className="form-floating mb-4">
							<select
								className="form-select"
								id="floatingSelect"
								aria-label="Floating label select example"
								name="categoryId"
								onChange={handleChange}
							>
								<option hidden selected>
									Selecciona una categoria
								</option>
								{categories?.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
							<label htmlFor="floatingSelect">Categoria</label>
							<p className="text-danger">{errors.categoryId}</p>
						</div>

						<div className="form-floating mb-4">
							<select
								className="form-select"
								id="floatingSelect"
								aria-label="Floating label select example"
								name="subcategoryId"
								onChange={handleChange}
							>
								<option hidden selected>
									Selecciona una subcategoria
								</option>
								{subCategories?.slice(0, 6).map((subcategory) => (
									<option key={subcategory.id} value={subcategory.id}>
										{subcategory.name}
									</option>
								))}
							</select>
							<label htmlFor="floatingSelect">Subcategoria</label>
							<p className="text-danger">{errors.subcategoryId}</p>
						</div>

						<div className="mb-4">
							<label htmlFor="formFile" className="form-label">
								Imagen
							</label>
							<input
								className="form-control"
								type="file"
								id="formFile"
								name="image"
								accept="image/*"
								onChange={handleImg}
							/>
							<div className="card mt-3" style={{ position: "relative" }}>
								<div className="image-container">
									{newProject.imageUrl ? (
										<img
											src={newProject.imageUrl}
											className="card-img-top imgCP"
											alt="Imagen seleccionada"
										/>
									) : (
										<img
											src={cargarImagen}
											className="card-img-top imgCP"
											alt="Imagen seleccionada"
										/>
									)}
									{newProject.imageUrl && (
										<button
											onClick={deleteImg}
											className="btn btn-danger deleteImgCP"
										>
											Eliminar Imagen
										</button>
									)}
								</div>
							</div>
							<p className="text-danger">{errors.imageUrl}</p>
						</div>

						<button className="btn btn-create" type="submit">
							Crear proyecto
						</button>
						{missingData && (
							<p className="text-danger">Faltan datos por completar</p>
						)}
						{projectExists && (
							<p className="text-danger">El proyecto ya existe</p>
						)}
					</form>
				</div>
			</div>
		)
	} else if (projectCreatedSuccessfully) {
		return <h3>Creaste un proyecto con exito</h3>
	}
}
