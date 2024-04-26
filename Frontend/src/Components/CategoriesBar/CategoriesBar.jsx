import { useDispatch } from "react-redux"
import { filterCategories } from "../../redux/actions/categoriesActions"
import { filterSubcategories } from "../../redux/actions/subcategoriesActions"
import { useNavigate } from "react-router-dom"
import { getProjects } from "../../redux/actions/projectActions"
import "./CategoriesBar.css"

// eslint-disable-next-line react/prop-types
export const CategoriesBar = ({ categories, subCategories }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleFilterCategory = (category) => {
		dispatch(filterCategories(category))
		navigate("/projectsView")
	}

	const handleFilterSubCategory = (category, subCategory) => {
		dispatch(filterSubcategories({ category, subCategory }))
		navigate("/projectsView")
	}

	const handleAllProjects = () => {
		dispatch(getProjects())
		navigate("/projectsView")
	}

	return (
		<div className="pt-2 pb-2 containerCategoriesBar">
			<div className="container text-center">
				<div className="row">
					{categories?.map((category) => (
						<div className="col" key={category.id}>
							<div className="btn-group">
								<button
									type="button"
									className="btn btn-secondary-subtle border border-0 buttonCategory"
									onClick={() => handleFilterCategory(category.id)}
									value={category.id}
								>
									{category.name}
								</button>
								<button
									type="button"
									className="btn btn-secondary-subtle dropdown-toggle dropdown-toggle-split border border-0 flecha"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<span className="visually-hidden">Toggle Dropdown</span>
								</button>
								<ul className="dropdown-menu dropdrownMenu">
									<li>
										<h6 className="dropdown-header dropdownHeader">
											Subcategorías
										</h6>
									</li>

									{subCategories?.slice(0, 6).map((subCategory) => (
										<li
											key={subCategory.id}
											className="dropdown-item dropdownItem"
											onClick={() =>
												handleFilterSubCategory(category.id, subCategory.id)
											}
											value={subCategory.name}
										>
											{subCategory.name}
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
					<div className="col lineaRosa">
						<div className="containerVerAllProject">
							<button
								type="button"
								className="btn btn-secondary-subtle border border-0 buttonCategory"
								onClick={handleAllProjects}
							>
								Ver todos los emprendimientos
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
