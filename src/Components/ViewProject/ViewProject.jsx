import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Project from "../Project/Project"
import { projects } from "../../assets/BDdemo/projects"


const ViewProject = () => {
    const [projectData, setProjectData] = useState(null)

    const { projectId } = useParams();


    useEffect(() => {
        const project = projects.find(item => item.id === parseInt(projectId));
        setProjectData(project);
    }, [projectId]);


    return (
        projectData && <Project {...projectData} />
    )
}


export default ViewProject