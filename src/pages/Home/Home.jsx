import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProjects } from "../../redux/actions/projectActions"
import { getCategories } from "../../redux/actions/categoriesActions"
import { getSubcategories } from "../../redux/actions/subcategoriesActions"
import { getUsers } from "../../redux/actions/userActions"
import { getVotes } from "../../redux/actions/votesActions"
import { CategoriesBar } from "../../Components/CategoriesBar/CategoriesBar"
import { Cards } from "../../Components/Cards/Cards"
import Carousel from "../../Components/Carousel/Carousel";
import "./home.css"


const Home = () => {
	const dispatch = useDispatch()

	const users = useSelector((state) => state.users)
	const projectsOnScreen = useSelector((state) => state.projectsOnScreen)
	const categories = useSelector((state) => state.categories)
	const subCategories = useSelector((state) => state.subCategories)
	const votes = useSelector((state) => state.votes)

	useEffect(() => {
		dispatch(getProjects())
		dispatch(getCategories())
		dispatch(getSubcategories())
		dispatch(getUsers())
		dispatch(getVotes())
	}, [dispatch])

	return (
		<>
			<div className="container-fluid containerText">
				<Carousel/>
			</div>
			<div>
				<CategoriesBar categories={categories} subCategories={subCategories} />
			</div>
			<div>
				<Cards
					users={users}
					projectsOnScreen={projectsOnScreen}
					votes={votes}
				/>
			</div>
		</>
	)
}

export default Home
