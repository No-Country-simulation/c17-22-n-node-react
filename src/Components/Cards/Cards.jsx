import { useDispatch } from "react-redux"
import { Card } from "../Card/Card"
import { getProjects } from "../../redux/actions/actions"
import "./cards.css"

export const Cards = ({ projectsOnScreen, users, votes }) => {
	const dispatch = useDispatch()

	const relation = (users, projectsOnScreen, votes) => {
		return projectsOnScreen.map((project) => {
			let user = users.find((user) => user.userId === project.entrepreneurId)

			let projectVotes = votes.find(
				(vote) => vote.entrepreneurshipId === project.entrepreneurshipId
			)

			return {
				entrepreneurshipId: project.entrepreneurshipId,
				image: project.image,
				name: project.name,
				description: project.description,
				categoryId: project.categoryId,
				subcategoryId: project.subcategoryId,
				positive: projectVotes.positive,
				negative: projectVotes.negative,
				entrepreneurId: project.entrepreneurId,
				user: user.username,
				userPhoto: user.image,
			}
		})
	}

	const projects = relation(users, projectsOnScreen, votes)

	const handleAllProjects = () => {
		dispatch(getProjects())
	}

	if (projects.length < 1) {
		return (
			<div className="containerNoProjects">
				<h6 className="mb-3 messageNoProjects">
					Todavia no hay proyectos con estas caracteristicas
				</h6>
				<button
					type="button"
					className="btn btn-lg buttonNoProjects"
					onClick={handleAllProjects}
				>
					Mostrar todos los proyectos
				</button>
			</div>
		)
	}
	return (
		<div className="container containerCardProjects">
			{projects?.map((project) => (
				<Card project={project} key={project.entrepreneurshipId} />
			))}
		</div>
	)
}
