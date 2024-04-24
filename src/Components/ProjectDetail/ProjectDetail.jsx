import { useState } from 'react';
import PropTypes from 'prop-types';
import ig from "../../assets/img/instagram.svg";
import email from "../../assets/img/email.svg"
import likeNegro from "../../assets/img/likeNegro.png"
import likeRosa from "../../assets/img/likeRosa.png"
import dislikeNegro from "../../assets/img/dislikeNegro.png"
import dislikeRosa from "../../assets/img/dislikeRosa.png"
import "./projectDetail.css"


const ProjectDetail = ({id, title, category, description, image, likes, dislikes, user}) => {
    const [likeGroup, setLikeGroup] = useState({ liked: false, count: likes, image: likeNegro });
    const [dislikeGroup, setDislikeGroup] = useState({ disliked: false, count: dislikes, image: dislikeNegro });


    const handleLike = () => {
        if (!likeGroup.liked && !dislikeGroup.disliked) {
            setLikeGroup({ liked: true, count: likeGroup.count + 1, image: likeRosa });
        } else if (likeGroup.liked && !dislikeGroup.disliked) {
            setLikeGroup({ liked: false, count: likeGroup.count - 1, image: likeNegro });
        } else if (!likeGroup.liked && dislikeGroup.disliked) {
            setLikeGroup({ liked: true, count: likeGroup.count + 1, image: likeRosa });
            setDislikeGroup({ disliked: false, count: dislikeGroup.count - 1, image: dislikeNegro });
        }
    };


    const handleDislike = () => {
        if (!dislikeGroup.disliked && !likeGroup.liked) {
            setDislikeGroup({ disliked: true, count: dislikeGroup.count + 1, image: dislikeRosa });
        } else if (dislikeGroup.disliked && !likeGroup.liked) {
            setDislikeGroup({ disliked: false, count: dislikeGroup.count - 1, image: dislikeNegro });
        } else if (!dislikeGroup.disliked && likeGroup.liked) {
            setDislikeGroup({ disliked: true, count: dislikeGroup.count + 1, image: dislikeRosa });
            setLikeGroup({ liked: false, count: likeGroup.count - 1, image: likeNegro });
        }
    };



    return (
        <article className='containerFather'>
            <div className='containerCardProyect' key={id}>
                <h1>{title}</h1>
                <h3>{category}</h3>
                
                <div className='container-fluid'>
                    <div className='row'>
                        <picture className="nleft col-md-8">
                            <img src={image} alt={`Img-${title}`} />
                        </picture>
                        
                        <section className='nright col-md-4'>
                            <div>
                                <div className='containerLikesProject'>
                                    <h6>Votación</h6>
                                    <h5><img src={likeGroup.image} alt="Like" onClick={handleLike}></img> <span>{likeGroup.count}</span></h5>
                                    <h5><img src={dislikeGroup.image} alt="Dislike" onClick={handleDislike}></img> <span>{dislikeGroup.count}</span></h5>
                                </div>
                                
                                <div className='containerUserProject'>
                                    <img className='userImg' src={user.photo} alt={`Img-of-user-${user.name}`} />
                                    <div>
                                        <p>Emprendedor: <span>{user.name}</span></p>
                                        <div className='rrss'>
                                            <a href="" target="_blank"><img className='rrssImg' src={ig} alt="img Instagram" /></a>
                                            <a href="" target="_blank"><img className='rrssImg' src={email} alt="img Instagram" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </section>
                    </div>
                </div>
                
                <div className='lineBackground'>.</div>
                
                <h2>Descripcion del proyecto</h2>
                <div className='containerDescription'>
                    <p>{description}</p>
                </div>
            </div>
        </article>
    )
}


ProjectDetail.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
};


export default ProjectDetail