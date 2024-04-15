import { useDispatch } from "react-redux"
import { filterCatgories, filterSubCatgories } from "../../redux/actions/actions"
import "./Categories.css"

// eslint-disable-next-line react/prop-types
export const CategoriesBar = ({categories, subCategories}) => {

    const dispatch = useDispatch()

    const handleFilterCategory = (e) => {
        dispatch(filterCatgories(e.target.value))
    }

    const handleFilterSubCategory = (category, subCategory) => {
        dispatch(filterSubCatgories({ category, subCategory }));
    };

    return (
        <div className="container">
            <h4 className="titleCat"><b>Categorías</b></h4>
            <div className="container text-center">
                <div className="row">

                    {categories?.map((category)=>(
                        <div className="col" key={category.categoryId}>  
                            <div className="btn-group">
                                <button type="button" className="btn btn-secondary-subtle border border-0 buttonCategory" onClick={handleFilterCategory} value={category.category}>{category.category}</button>
                                <button type="button" className="btn btn-secondary-subtle dropdown-toggle dropdown-toggle-split border border-0 flecha" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu dropdrownMenu">
                                    <li><h6 className="dropdown-header dropdownHeader">Subcategorías</h6></li>
                                
                                    {subCategories?.map((subCategory)=> (
                                        <li key={subCategory.subcategoryId} className="dropdown-item dropdownItem" onClick={() => handleFilterSubCategory(category.category, subCategory.subcategory)} value={subCategory.subCategory}>{subCategory.subcategory}</li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}