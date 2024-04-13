import PropTypes from 'prop-types';
import ig from "../../assets/img/instagram.png";
import em from "../../assets/img/gmail.png"
import "./project.css"


const Project = ({id, title, summary, content, img, likes, author}) => {
    return (
        <article className='containerFather'>
            <div className='containerCardProyect' key={id}>
                <h1>{title}</h1>
                <h3>{summary}</h3>
                
                <div className='container-fluid'>
                    <div className='row'>
                        <picture className="nleft col-md-8">
                            <img src={img} alt={`Img-${title}`} />
                        </picture>
                        
                        <section className='nright col-md-4'>
                            <div className='one'>
                                <h6>Likes: <span>{likes}</span>❤️</h6>
                                <h6>Emprendedore/s: <span>{author}</span></h6>
                            </div>
                            
                            <button className='efectoBoton'>Me gusta</button>
                            
                            <h5>Contacto</h5>
                            <div className='two'>
                                <a href=""><img src={em} alt="img Email" /></a>
                                    <br />
                                <a href=""><img src={ig} alt="img Instagram" /></a>
                            </div>
                        </section>
                    </div>
                </div>
                
                <h2>Descripcion del proyecto</h2>
                <div className='containerDescription'>
                    <p>{content}</p>
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