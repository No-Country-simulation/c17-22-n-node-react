import { CategoriesBar } from "../../Components/CategoriesBar/CategoriesBar"
import { Cards } from "../../Components/Cards/Cards"
import "./home.css"

const Home = () => {
    return (
        <>
            <div className="container containerText">
                <p className="d-sm-block"><b>Ahora sos todo un EMPRENDEDOR listo para compartir tus proyectos de<br />entretenimiento al mundo en esta plataforma de Crowfunding. <br />
                Los integrantes de esta comunidad van a ser los Inversores que con su voto <br />(a favor o en contra) le otorgan un diferencial a tu creacion permitiendo mas <br />visibilidad y la gran posibilidad de que salgas al mercado comercial. Sumate!</b>
                </p>
            </div>
            <div>
                <CategoriesBar/>
            </div>
            <div>
                <Cards />
            </div>
        </>
    )
}


export default Home