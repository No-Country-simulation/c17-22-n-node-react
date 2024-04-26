import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { projects } from "../../assets/BDdemo/projects"
import ProjectDetail from "../ProjectDetail/ProjectDetail.jsx"


const ViewProject = () => {
    const [projectData, setProjectData] = useState(null)

    const { projectId } = useParams();

    useEffect(() => {
        const project = projects.find(item => item.id === parseInt(projectId));
        setProjectData(project);
    }, [projectId]);


    return (
        projectData && <ProjectDetail {...projectData} />
    )
}


export default ViewProject