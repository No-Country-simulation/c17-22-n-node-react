import { projects } from "../../assets/BDdemo/projects"
import { useState } from "react";
import "./dashboardAdmin.css"



const DashboardAdmin = () => {
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleClick = (projectId) => {
        setSelectedProjectId(prevId => (prevId === projectId ? null : projectId));
    };


    return (
        <div className="containerDashboard">
            <h1>Dashboard Admin</h1>
                <hr />
            <div className="usersContainer">
            {
            projects.map((project) =>(
                    <div key={project.id} className="containerUsers">
                        <h2>{project.user.name}</h2>
                        
                        <button className="efectoBoton" onClick={() => handleClick(project.id)}>
                            {selectedProjectId === project.id ? "Ocultar proyectos del usuario" : "Ver proyectos del usuario"}
                        </button>
                        {selectedProjectId === project.id && <h3>{project.title}</h3>}
                    </div>
                ))
            }
            </div>
        </div>
    )
}



export default DashboardAdmin