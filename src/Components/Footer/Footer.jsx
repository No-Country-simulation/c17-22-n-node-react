import { Link } from "react-router-dom";
import house from "../../assets/img/home.png"
import mail from "../../assets/img/email.png"
import jsonData from "../../../db.json";
import lg from "../../assets/img/Story Starter.svg"
import "./footer.css"


const Footer = () => {
    const proyects = jsonData;

    const lengthOfTitle = (title) => {
        if (title.length > 20) {
            return title.substring(0, 20) + "...";
        } else {
            return title;
        }
    };


    return (
        <footer className="text-center text-lg-start bg-body-tertiary">
            <section>
                <div className="container text-center text-md-start mt-5">
                    {/* Grid row  */}
                    <div className="row mt-3">
                    
                    {/* Grid column */}
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto">
                        <h6 className="fw-bold">Story Starter</h6>
                        <hr className="mb-3 mt-0 d-inline-block mx-auto hrStyles" />
                        <p>Ayudamos a comenzar tu historia...</p>
                        <Link to="/"><img className="imgStyleLogo" src={lg} alt="Logo" /></Link>
                    </div>
                    {/* Grid column */}
                    
                    {/* Grid column */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
                        <h6 className="fw-bold">Ultimos proyectos</h6>
                        <hr className="mb-3 mt-0 d-inline-block mx-auto hrStyles" />
                        {
                        proyects.map((proyect, index) => (
                            index < 6 && <p key={proyect.id}>
                                <Link to={`/proyect/${proyect.id}`}>{lengthOfTitle(proyect.title)}</Link>
                            </p>
                            ))
                        }
                    </div>
                    {/* Grid column */}
                    
                    {/* Grid column */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0">
                        <h6 className="fw-bold">Contacto</h6>
                        <hr className="mb-3 mt-0 d-inline-block mx-auto hrStyles" />
                        <p><img className="imgStyle" src={house} alt="house" /> Argentina</p>
                        <p><img className="imgStyle" src={mail} alt="mail" /> storystarter@gmail.com</p>
                    </div>
                    {/* Grid column */}
                    </div>
                    {/* Grid row */}
                </div>
            </section>
            <hr />
            <div className="text-center p-3 colorUpDown">
                <p>© 2024 Copyright Story Starter</p>
            </div>
        </footer>
    )
}


export default Footer