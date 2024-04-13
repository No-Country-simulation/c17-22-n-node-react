// import { Link } from "react-router-dom"
import sol from "../../assets/img/sol.png"
import luna from "../../assets/img/luna.png"
import "./card.css"

// eslint-disable-next-line react/prop-types
export const Card = ({proyect}) => {
    // eslint-disable-next-line react/prop-types
    const {image, userImage, user, name, description, category, subCategory, likes, dislikes} = proyect

    return(
        <div className="container mb-4">
            <hr />
            <div className="card mb-4 containerCard">
                <div className="row g-0">
                    <div className="col-md-4 containerImgProyect">
                            <img src={image} alt="god_of_war" className="img-fluid rounded-start imgProject " />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="container card-header d-flex align-items-center">
                                {/* <Link to={`/user/${id}`}> */}
                                <img src={userImage} alt="user" className="img-thumbnail rounded-circle rounded float-start imgUser mx-2 object-fit-cover border rounded"/>
                                <h5 className="">{user}</h5>
                                {/* </Link> */}
                            </div>
                            <div className="container col align-items-center mt-3">
                                <h3 className="card-title"><b>{name}</b></h3>
                                <p className="card-text text-truncate">{description}</p>
                                <div className="d-flex">
                                    <h6 className="me-3 badge text-bg-secondary">{category}</h6>
                                    <h6 className="badge text-bg-secondary">{subCategory}</h6>
                                </div>
                            </div>
                        </div>               
                    </div>
                </div>
            </div>

            <div className="container d-flex align-items-center justify-content-center my-3">
                <h5>Votación</h5>
                <div className="d-flex align-items-center justify-content-center mx-5">
                    <img src={sol} alt="Like" className="img-fluid iconsCard" />
                    <div className="d-flex align-items-center justify-content-center colorBackgroundLikes">
                        <b>{likes}</b>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <img src={luna} alt="Dislike" className="img-fluid iconsCard" />
                    <div className="d-flex align-items-center justify-content-center colorBackgroundLikes">
                        <b>{dislikes}</b>
                    </div>
                </div>
            </div>

        </div>
    )
}