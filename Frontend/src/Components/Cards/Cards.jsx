import { useDispatch } from "react-redux"
import { Card } from "../Card/Card"
import "./cards.css"
import { getProjects } from "../../redux/actions/projectActions"

export const Cards = ({ projects, users }) => {
	const dispatch = useDispatch()

	const relation = (users, projects) => {
		return projects.map((project) => {
			let user = users.find((user) => user.id === project.entrepeneurId)

			return {
				entrepreneurshipId: project.id,
				image: project.image,
				name: project.name,
				description: project.description,
				// categoryId: project.categoryId,
				subcategoryId: project.subcategoryId,
				// positive: project.votes.cant_positive,
				// negative: project.votes.cant_negative,
				entrepreneurId: project.entrepreneurId,
				user: user.name,
				userPhoto: user.image,
			}
		})
	}

	const projectsView = relation(users, projects)

	const handleAllProjects = () => {
		dispatch(getProjects())
		window.scrollTo(0, 0)
	}

	if (projectsView.length < 1) {
		return (
			<div className="containerNoProjects">
				<h6 className="mb-3 messageNoProjects">
					Todavia no hay emprendimientos con estas caracteristicas
				</h6>
				<button
					type="button"
					className="btn btn-lg buttonNoProjects"
					onClick={handleAllProjects}
				>
					Descubrir todos los emprendimientos
				</button>
			</div>
		)
	}
	if (projectsView) {
		return (
			<div className="container containerCardProjects">
				{projectsView?.map((project) => (
					<Card project={project} key={project.entrepreneurshipId} />
				))}
			</div>
		)
	}
}
