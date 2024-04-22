import firstImg from "../../assets/img/firstImg.svg"
import secondImg from "../../assets/img/secondImg.svg"
import thirdImg from "../../assets/img/thirdImg.svg"
import "./carousel.css"


const Carousel = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="bg-dark active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" className="bg-dark" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" className="bg-dark" aria-label="Slide 3"></button>
            </div>
            
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="containerCarousel" id="welcomeCarousel">
                        <article className="Lright">
                            <img src={secondImg} className="d-block" alt="..." />
                        </article>
                        
                        <article className="Lleft">
                            <h2>Bienvenidos</h2>
                            <p>Somos más que una plataforma de crowdfunding, somos un punto de encuentro para hacer realidad tus sueños. En Story Starter, creemos en el poder de la comunidad de entretenimiento para impulsar proyectos innovadores, creativos y transformadores.</p>
                        </article>
                    </div>
                </div>
                
                <div className="carousel-item">
                    <div className="containerCarousel">
                        <article className="Lleft">
                            <h2>Inversores</h2>
                            <p>Tenes el poder de impulsar el cambio, de permitir mas visibilidad a cada proyecto y la gran posibilidad de que salgan al mercado. Cada voto a favor es un paso hacia adelante para proyectos visionarios, mientras que cada voto en contra  desafía a los emprendedores a mejorar. Únete a nuestra comunidad de inversores y sé parte del proceso de creación. ¿Estás listo para marcar la diferencia?</p>
                        </article>
                        
                        <article className="Lright">
                            <img src={firstImg} className="d-block" alt="..." />
                        </article>
                    </div>
                </div>
                
                <div className="carousel-item">
                    <div className="containerCarousel">
                        <article className="Lleft">
                            <h2>Emprendedores</h2>
                            <p>¿Estas listo para compartir tus proyectos de entretenimiento al mundo? En Story Starter te ofrecemos la oportunidad de llevar tus ideas más allá de los límites. Con nuestra comunidad de apoyo y herramientas especializadas, juntos podemos hacer que tu visión cobre vida. Únete hoy mismo y comienza el viaje hacia el éxito. ¿Estás listo para dar el primer paso?</p>
                        </article>
                        
                        <article className="Lright">
                            <img src={thirdImg} className="d-block" alt="..." />
                        </article>
                    </div>
                </div>
            </div>
            
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}


export default Carousel