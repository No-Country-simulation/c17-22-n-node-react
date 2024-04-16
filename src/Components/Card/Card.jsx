import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { filterCatgories, filterSubCatgories } from "../../redux/actions/actions"
import "./card.css"

import sol from "../../assets/img/sol.png"
import luna from "../../assets/img/luna.png"
import solRosa from "../../assets/img/solRosa.png"
import lunaRosa from "../../assets/img/lunaRosa.png"

export const Card = ({project}) => {

    const dispatch = useDispatch()

    const { id, image, title, description, category, subCategory, likes, dislikes, user} = project

    const [sun, setSun] = useState(sol)
    const [liked, setLiked] = useState(false)
    const [likesCard, setLikesCard] = useState(likes)

    const [moon, setMoon] = useState(luna)
    const [disliked, setDisliked] = useState(false) 
    const [dislikesCard, setDislikesCard] = useState(dislikes)


    const handleFilterCategory = (category) => {
        console.log(category)
        dispatch(filterCatgories(category))
    }

    const handleFilterSubCategory = (category, subCategory) => {
        console.log(category, subCategory)
        dispatch(filterSubCatgories({ category, subCategory }));
    };

    const handleLike = () =>{
        if(!liked && !disliked){
            setLikesCard(likesCard + 1)
            setLiked(true)
            setSun(solRosa)
        }

        if(liked && !disliked){
            setLikesCard(likesCard - 1)
            setLiked(false)
            setSun(sol)
        }

        if(!liked && disliked){
            setLikesCard(likesCard + 1)
            setDislikesCard(dislikesCard - 1)
            setLiked(true)
            setSun(solRosa)
            setDisliked(false)
            setMoon(luna)
        }

    }

    const handleDislike = () =>{
        if(!disliked && !liked){
            setDislikesCard(dislikesCard + 1)
            setDisliked(true)
            setMoon(lunaRosa)
        }
    
        if(disliked && !liked){
            setDislikesCard(dislikesCard - 1)
            setDisliked(false)
            setMoon(luna)
        }
    
        if(!disliked && liked){
            setDislikesCard(dislikesCard + 1)
            setLikesCard(likesCard - 1)
            setDisliked(true)
            setMoon(lunaRosa)
            setLiked(false)
            setSun(sol)
        }
    }

    return(
        <div className="container mb-4 containerGeneralCard">
            <hr />
            <Link to={`/project/${id}`} className="containerLinkCard">
                <div className="card mb-4 containerCard">
                    <div className="row g-0">
                        <div className="col-md-4 containerImgProject">
                                <img src={image} alt="god_of_war" className="img-fluid rounded-start imgProject " />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="container card-header d-flex align-items-center">                                
                                    
                                    <Link to={`/user/${user.id}`} className="containerLinkUser align-items-center">
                                        <img src={user.photo} alt="user" to={`/user/${user.id}`} className="img-thumbnail rounded-circle rounded float-start imgUser mx-2 object-fit-cover border rounded"/>
                                        <h5>{user.name}</h5>
                                    </Link>

                                </div>
                                <div className="container col align-items-center mt-3">
                                    <h3 className="card-title"><b>{title}</b></h3>
                                    <p className="card-text text-truncate">{description}</p>
                                    <div className="d-flex">
                                        <Link to={"/"} onClick={() => handleFilterCategory(category)}>
                                            <button className="me-3 badge buttonCategoryCard" >{category}</button>
                                        </Link>
                                        <Link to={"/"} onClick={() => handleFilterSubCategory(category, subCategory)}>
                                            <button className="badge  buttonCategoryCard">{subCategory}</button>
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
                    <img src={sun} alt="Like" className="img-fluid iconsCard" onClick={handleLike}/>
                    <div className="d-flex align-items-center justify-content-center colorBackgroundLikes">
                        <b>{likesCard}</b>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <img src={moon} alt="Dislike" className="img-fluid iconsCard" onClick={handleDislike}/>
                    <div className="d-flex align-items-center justify-content-center colorBackgroundLikes">
                        <b>{dislikesCard}</b>
                    </div>
                </div>
            </div>

        </div>
    )
}