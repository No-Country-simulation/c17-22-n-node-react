import PropTypes from 'prop-types';
import ig from "../../assets/img/instagram.png";
import em from "../../assets/img/gmail.png"
import "./project.css"


const Project = ({id, title, category, description, image, likes, dislikes, user}) => {
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
                                    <h6>Likes: <span>{likes}</span>❤️</h6>
                                    <h6>Dislikes: <span>{dislikes}</span>💔</h6>
                                </div>
                                
                                <div className='containerUserProject'>
                                    <h6>Emprendedore/s: <span>{user.name}</span></h6>
                                    <img className='userImg' src={user.photo} alt={`Img-of-user-${user.name}`} />
                                </div>
                            </div>
                            
                            <button className='efectoBoton'>Me gusta</button>
                            
                            <h5>Contacto</h5>
                            <div className='two'>
                                <a href="" target="_blank"><img className='rrssImg' src={em} alt="img Email" /></a>
                                    <br />
                                <a href="" target="_blank"><img className='rrssImg' src={ig} alt="img Instagram" /></a>
                            </div>
                        </section>
                    </div>
                </div>
                
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
    summary: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};


export default Project