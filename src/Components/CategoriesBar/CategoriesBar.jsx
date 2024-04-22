import { useDispatch } from "react-redux"
import { filterCategories } from "../../redux/actions/categoriesActions"
import { filterSubcategories } from "../../redux/actions/subcategoriesActions"
import "./Categories.css"

// eslint-disable-next-line react/prop-types
export const CategoriesBar = ({ categories, subCategories }) => {
	const dispatch = useDispatch()

	const handleFilterCategory = (e) => {
		dispatch(filterCategories(e.target.value))
	}

	const handleFilterSubCategory = (category, subCategory) => {
		dispatch(filterSubcategories({ category, subCategory }))
	}

	return (
		<div className="pt-2 containerCategoriesBar">
			<div className="container text-center">
				<div className="row">
					{categories?.map((category) => (
						<div className="col" key={category.categoryId}>
							<div className="btn-group">
								<button
									type="button"
									className="btn btn-secondary-subtle border border-0 buttonCategory"
									onClick={handleFilterCategory}
									value={category.categoryId}
								>
									{category.category}
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

									{subCategories?.map((subCategory) => (
										<li
											key={subCategory.subcategoryId}
											className="dropdown-item dropdownItem"
											onClick={() =>
												handleFilterSubCategory(
													category.categoryId,
													subCategory.subcategoryId
												)
											}
											value={subCategory.subCategory}
										>
											{subCategory.subcategory}
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
