import { useEffect, useState } from "react"
import validation from "../../assets/validations/createProject"
import "./createproject.css"
import { useDispatch, useSelector } from "react-redux"
import {
	getCategories,
	getSubCategories,
	postProject,
} from "../../redux/actions/actions"

export const CreateProject = () => {
	const dispatch = useDispatch()
	const categories = useSelector((state) => state.categories)
	const subCategories = useSelector((state) => state.subCategories)

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

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setNewProject({ ...newProject, [name]: value })
		setErrors(validation({ ...newProject, [name]: value }))
	}

	const [projectCreatedSuccessfully, setProjectCreatedSuccessfully] =
		useState(false)
	const [projectExists, setProjectExists] = useState(false)
	const [missingData, setMissingData] = useState(false)

	const allProjects = useSelector((state) => state.allProjects)

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
			dispatch(postProject(newProject))
			setProjectCreatedSuccessfully(true)
		}
	}

	useEffect(() => {
		dispatch(getCategories())
		dispatch(getSubCategories())
	}, [dispatch])

	if (!projectCreatedSuccessfully) {
		return (
			<div className="bg-body-tertiary d-flex flex-column align-items-center justify-content-center gap-4">
				<h3>Empeza tu proyecto</h3>
				<div>
					<form
						className="needs-validation bg-body-tertiary mx-3 2"
						noValidate
						onSubmit={handleSubmit}
					>
						<div className="form-floating col-md-12 mb-4">
							<input
								type="email"
								className="form-control"
								id="floatingInput"
								placeholder=""
								name="name"
								value={newProject.name}
								onChange={handleChange}
							/>
							<label htmlFor="floatingInput">Titulo</label>
							<p>{errors.name}</p>
						</div>
						<div className="form-floating col-md-12 mb-4">
							<textarea
								className="form-control"
								placeholder=""
								id="floatingTextarea"
								name="description"
								value={newProject.description}
								onChange={handleChange}
							></textarea>
							<label htmlFor="floatingTextarea">Descripción</label>
							<p>{errors.description}</p>
						</div>
						<div className="form-floating col-md-12 mb-4">
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
									<option key={category.categoryId} value={category.categoryId}>
										{category.category}
									</option>
								))}
							</select>
							<label htmlFor="floatingSelect">Categoria</label>
							<p>{errors.categoryId}</p>
						</div>
						<div className="form-floating col-md-12 mb-4">
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
								{subCategories?.map((subcategory) => (
									<option
										key={subcategory.subcategoryId}
										value={subcategory.subcategoryId}
									>
										{subcategory.subcategory}
									</option>
								))}
							</select>
							<label htmlFor="floatingSelect">Subcategoria</label>
							<p>{errors.subcategoryId}</p>
						</div>
						<div className="col-md-12 mb-4">
							<label htmlFor="formFile" className="form-label">
								Imagen
							</label>
							<input
								className="form-control"
								type="file"
								id="formFile"
								name="image"
								value={newProject.image}
								onChange={handleChange}
							/>
							<p>{errors.subcategoryId}</p>
						</div>
						<div>
							<button className="btn col-md-12 mb-4 btn-create" type="submit">
								Crear proyecto
							</button>
							{missingData && <p>Faltan datos por completar</p>}
							{projectExists && <p>La receta ya existe</p>}
						</div>
					</form>
				</div>
			</div>
		)
	} else if (projectCreatedSuccessfully) {
		return <h3>Creaste un proyecto con exito</h3>
	}
}
