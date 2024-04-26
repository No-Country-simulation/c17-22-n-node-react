import { projects } from "../../assets/BDdemo/projects";
import { useState } from "react";
import "./dashboardAdmin.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../redux/actions/projectActions";
import { updateUser } from "../../redux/actions/userActions";

const DashboardAdmin = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (projectId) => {
    setSelectedProjectId((prevId) => (prevId === projectId ? null : projectId));
  };

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id))
      .then(() => {
        console.log("El proyecto se borro correctamente");
      })
      .catch((err) => console.error("No se pudo borrar el proyecto", err));
  };

  const HandleBanUser = (id) => {
    const user = useSelector((state) =>
      state.users.find((u) => u.userId === id)
    );

    const banUser = { ...user, baned: true }

    dispatch(updateUser(banUser));
  };

  // Añadir que se puedan agregar categorias y subcategorias
  return (
    <div className="containerDashboard">
      <h1>Dashboard Admin</h1>
      <hr />
      <div className="usersContainer">
        {projects.map((project) => (
          <div key={project.id} className="containerUsers">
            <h2>{project.user.name}</h2>
            <button
              className="btn btn-danger"
              onClick={() => HandleBanUser(project.user.id)}
            >
              Banear
            </button>
            <button
              className="efectoBoton"
              type="button"
              onClick={() => handleClick(project.id)}
            >
              {selectedProjectId === project.id
                ? "Ocultar proyectos del usuario"
                : "Ver proyectos del usuario"}
            </button>
            {selectedProjectId === project.id && (
              <>
                <div
                  style={{
                    border: "1px solid gray",
                    padding: ".5rem 0",
                    borderRadius: ".5rem",
                  }}
                  className="d-flex flex-column align-items-center gap-1"
                >
                  <h3>{project.title}</h3>
                  <Link
                    className="btn btn-create"
                    to={`/project/${project.id}`}
                  >
                    Ver proyecto
                  </Link>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Borrar proyecto
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdmin;
