import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { filterCategories } from "../../redux/actions/categoriesActions"
import { filterSubcategories } from "../../redux/actions/subcategoriesActions"
import "./card.css"

import likeNegro from "../../assets/img/likeNegro.png"
import likeRosa from "../../assets/img/likeRosa.png"
import dislikeNegro from "../../assets/img/dislikeNegro.png"
import dislikeRosa from "../../assets/img/dislikeRosa.png"

export const Card = ({ project }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const categories = useSelector((state) => state.categories)
	const subcategories = useSelector((state) => state.subCategories)

	const {
		entrepreneurshipId,
		image,
		name,
		description,
		categoryId,
		subcategoryId,
		positive,
		negative,
		entrepreneurId,
		user,
		userPhoto,
	} = project

	const category = categories?.find((category) => {
		return category.id === categoryId
	})

	const subcategory = subcategories.find(
		(subCategory) => subCategory.id === subcategoryId
	)

	//MANEJO DE VOTOS POR CARD--------------------------------------------------------

	const [likeImg, setLikeImg] = useState(likeNegro)
	const [liked, setLiked] = useState(false)
	const [likesCard, setLikesCard] = useState(positive)

	const [dislikeImg, setDislikeImg] = useState(dislikeNegro)
	const [disliked, setDisliked] = useState(false)
	const [dislikesCard, setDislikesCard] = useState(negative)

	const handleLike = () => {
		if (!liked && !disliked) {
			setLikesCard(likesCard + 1)
			setLiked(true)
			setLikeImg(likeRosa)
		}

		if (liked && !disliked) {
			setLikesCard(likesCard - 1)
			setLiked(false)
			setLikeImg(likeNegro)
		}

		if (!liked && disliked) {
			setLikesCard(likesCard + 1)
			setDislikesCard(dislikesCard - 1)
			setLiked(true)
			setLikeImg(likeRosa)
			setDisliked(false)
			setDislikeImg(dislikeNegro)
		}
	}

	const handleDislike = () => {
		if (!disliked && !liked) {
			setDislikesCard(dislikesCard + 1)
			setDisliked(true)
			setDislikeImg(dislikeRosa)
		}

		if (disliked && !liked) {
			setDislikesCard(dislikesCard - 1)
			setDisliked(false)
			setDislikeImg(dislikeNegro)
		}

		if (!disliked && liked) {
			setDislikesCard(dislikesCard + 1)
			setLikesCard(likesCard - 1)
			setDisliked(true)
			setDislikeImg(dislikeRosa)
			setLiked(false)
			setLikeImg(likeNegro)
		}
	}

	//--------------------------------------------------------------------------------

	//FILTRADOS POR CLICK EN CATEGORIAS DE LA CARD------------------------------------

	const handleFilterCategory = (category) => {
		dispatch(filterCategories(category))
		navigate("/projectsView")
		window.scrollTo(0, 0)
	}

	const handleFilterSubCategory = (category, subCategory) => {
		dispatch(filterSubcategories({ category, subCategory }))
		navigate("/projectsView")
		window.scrollTo(0, 0)
	}

	//--------------------------------------------------------------------------------

	if (categories < 1) {
		return <h6>cargando</h6>
	}

	return (
		<div className="container mb-4 containerGeneralCard">
			<hr />
			<Link to={`/project/${entrepreneurshipId}`} className="containerLinkCard">
				<div className="card mb-4 containerCard">
					<div className="row g-0">
						<div className="col-md-4 containerImgProject">
							<img
								src={image}
								alt={name}
								className="img-fluid rounded-start imgProject "
							/>
						</div>
						<div className="col-md-8">
							<div className="card-body">
								<div className="container card-header d-flex align-items-center">
									<Link
										to={`/user/${entrepreneurId}`}
										className="containerLinkUser align-items-center"
									>
										<img
											src={userPhoto}
											alt="user"
											to={`/user/${entrepreneurId}`}
											className="img-thumbnail rounded-circle rounded float-start imgUser mx-2 object-fit-cover border rounded"
										/>
										<h5>{user}</h5>
									</Link>
								</div>
								<div className="container col align-items-center mt-3">
									<h3 className="card-title">
										<b>{name}</b>
									</h3>
									<p className="card-text text-truncate">{description}</p>
									<div className="d-flex">
										<Link
											to={"/projectsView"}
											onClick={() => handleFilterCategory(category.id)}
										>
											<button className="me-3 badge buttonCategoryCard">
												{category?.name}
											</button>
										</Link>
										<Link
											to={"/projectsView"}
											onClick={() =>
												handleFilterSubCategory(category.id, subcategory.id)
											}
										>
											<button className="badge  buttonCategoryCard">
												{subcategory.name}
											</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>

			<div className="container d-flex align-items-center justify-content-center my-3">
				<h5>Votación</h5>
				<div className="d-flex align-items-center justify-content-center mx-5">
					<img
						src={likeImg}
						alt="Like"
						className="img-fluid iconsCard"
						onClick={handleLike}
					/>
					<div className="d-flex align-items-center justify-content-center likesCard">
						<b>{likesCard}</b>
					</div>
				</div>
				<div className="d-flex align-items-center justify-content-center">
					<img
						src={dislikeImg}
						alt="Dislike"
						className="img-fluid iconsCard"
						onClick={handleDislike}
					/>
					<div className="d-flex align-items-center justify-content-center likesCard">
						<b>{dislikesCard}</b>
					</div>
				</div>
			</div>
		</div>
	)
}
