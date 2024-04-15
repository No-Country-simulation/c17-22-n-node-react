import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Project from "../Project/Project"
import jsonData from "../../assets/BDdemo/db.json";


const ViewProyect = () => {
    const [proyectData, setProyectData] = useState(null)

    const { proyectId } = useParams();


    useEffect(() => {
        const project = jsonData.find(item => item.id === parseInt(proyectId));
        setProyectData(project);
    }, [proyectId]);


    return (
        proyectData && <Project {...proyectData} />
    )
}


export default ViewProyect