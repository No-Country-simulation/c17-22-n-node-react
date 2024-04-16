import { useDispatch } from "react-redux";
import { Card } from "../Card/Card";
import "./cards.css"
import { getProjects } from "../../redux/actions/actions";

export const Cards = ({projects}) => {

    const dispatch = useDispatch()

    const handleAllProjects = () =>{
        dispatch(getProjects())
    }

    if(projects.length < 1){
        return(
            <div className="containerNoProjects">
                <h6 className="mb-3 messageNoProjects">Todavia no hay proyectos con estas caracteristicas</h6>
                <button type="button" className="btn btn-lg buttonNoProjects" onClick={handleAllProjects}>Mostrar todos los proyectos</button>
            </div>
        )
    }
    return(
        <div className="container containerCardProjects">
            {projects?.map((project)=> (
                <Card project={project} key={project.id}/>
            ))}
        </div>
    )
}