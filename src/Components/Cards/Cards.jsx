import { Card } from "../Card/Card";
import { proyects } from "../../assets/BDdemo/proyects";
import "./cards.css"

export const Cards = () => {


    return(
        <div className="container-fluid containerCards">
            {proyects?.map((proyect)=> (
                <Card proyect={proyect} key={proyect.id}/>
            ))}
        </div>
    )
}