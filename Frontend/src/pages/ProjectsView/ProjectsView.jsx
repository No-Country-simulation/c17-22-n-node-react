import { useDispatch, useSelector } from "react-redux"
import { CategoriesBar } from "../../Components/CategoriesBar/CategoriesBar"
import { Cards } from "../../Components/Cards/Cards"
import { useEffect } from "react"
import { getCategories } from "../../redux/actions/categoriesActions"
import { getSubcategories } from "../../redux/actions/subcategoriesActions"
import { getProjects } from "../../redux/actions/projectActions"
import { getUsers } from "../../redux/actions/userActions"

export const ProjectsView = () => {
	const dispatch = useDispatch()

	const categories = useSelector((state) => state.categories)
	const subCategories = useSelector((state) => state.subCategories)
	const projectsOnScreen = useSelector((state) => state.projectsOnScreen)
	const users = useSelector((state) => state.users)

	useEffect(() => {
		if (categories.length < 1) {
			dispatch(getCategories())
		}

		if (subCategories.length < 1) {
			dispatch(getSubcategories())
		}

		if (projectsOnScreen.length < 1) {
			dispatch(getProjects())
		}

		if (users.length < 1) {
			dispatch(getUsers())
		}

		window.scrollTo(0, 0)
	}, [dispatch])

	return (
		<>
			<div>
				<CategoriesBar categories={categories} subCategories={subCategories} />
			</div>
			<div>
				<Cards users={users} projects={projectsOnScreen} />
			</div>
		</>
	)
}
