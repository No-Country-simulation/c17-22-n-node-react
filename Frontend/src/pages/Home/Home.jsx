import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
	getBestProjects,
	getProjects,
} from "../../redux/actions/projectActions"
import { getCategories } from "../../redux/actions/categoriesActions"
import { getSubcategories } from "../../redux/actions/subcategoriesActions"
import { getUsers } from "../../redux/actions/userActions"
import { CategoriesBar } from "../../Components/CategoriesBar/CategoriesBar"
import { Cards } from "../../Components/Cards/Cards"
import Carousel from "../../Components/Carousel/Carousel"
import "./home.css"

const Home = () => {
	const dispatch = useDispatch()

	const users = useSelector((state) => state.users)
	const categories = useSelector((state) => state.categories)
	const subCategories = useSelector((state) => state.subCategories)
	const bestProjects = useSelector((state) => state.bestProjects)

	useEffect(() => {
		dispatch(getProjects())
		dispatch(getCategories())
		dispatch(getSubcategories())
		dispatch(getUsers())
		dispatch(getBestProjects())
		window.scrollTo(0, 0)
	}, [dispatch])

	return (
		<>
			<div>
				<CategoriesBar categories={categories} subCategories={subCategories} />
			</div>
			<div className="container-fluid containerText">
				<Carousel />
			</div>
			<h3 className="container proyectoDestacado mt-5">Proyectos destacados</h3>
			<div>
			{ users.length === 0 || users ? <h4 className="text-center m-5 p-5">Por ahora no hay proyectos destacados</h4> : <Cards users={users} projects={bestProjects} categories={categories} /> }
			</div>
		</>
	)
}

export default Home
