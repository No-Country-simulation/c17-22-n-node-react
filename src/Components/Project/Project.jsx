import { useState } from 'react';
import PropTypes from 'prop-types';
import ig from "../../assets/img/instagram.png";
import likeNegro from "../../assets/img/likeNegro.png"
import likeRosa from "../../assets/img/likeRosa.png"
import dislikeNegro from "../../assets/img/dislikeNegro.png"
import dislikeRosa from "../../assets/img/dislikeRosa.png"
import "./project.css"


const Project = ({id, title, category, description, image, likes, dislikes, user}) => {
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
                            <div className='one'>
                                <div className='containerLikesProject'>
                                    <h6>Votación</h6>
                                    <h6><img src={likeGroup.image} alt="Like" onClick={handleLike}></img> <span>{likeGroup.count}</span></h6>
                                    <h6><img src={dislikeGroup.image} alt="Dislike" onClick={handleDislike}></img> <span>{dislikeGroup.count}</span></h6>
                                </div>
                                
                                <div className='containerUserProject'>
                                    <h6>Emprendedore/s: <span>{user.name}</span></h6>
                                    <img className='userImg' src={user.photo} alt={`Img-of-user-${user.name}`} />
                                </div>
                            </div>
                            
                            <div className='two'>
                                <a href="" target="_blank"><img className='rrssImg' src={ig} alt="img Instagram" /></a>
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


Project.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
};


export default Project