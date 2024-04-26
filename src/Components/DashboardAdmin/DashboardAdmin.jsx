import { projects } from "../../assets/BDdemo/projects";
import { useEffect, useState } from "react";
import "./dashboardAdmin.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../redux/actions/projectActions";
import { updateUser } from "../../redux/actions/userActions";
import {
  addCategory,
  dedeleteCategoryleteUser,
  getCategories,
} from "../../redux/actions/categoriesActions";
import {
  addSubcategory,
  getSubcategories,
} from "../../redux/actions/subcategoriesActions";

const DashboardAdmin = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const dispatch = useDispatch();
  const [showFormCategory, setShowFormCategory] = useState(false);
  const [showFormSubCategory, setShowFormSubCategory] = useState(false);

  const [newCategory, setNewCategory] = useState({
    categoryId: "",
    category: "",
  });

  const [newSubcategory, setNewSubcategory] = useState({
    subcategoryId: "",
    subcategory: "",
  });

  const users = useSelector((state) => state.users);
  // const projects = useSelector(state => state.projectsOnScreen)
  const categories = useSelector((state) => state.categories);
  const subCategories = useSelector((state) => state.subCategories);

  useEffect(() => {
    // dispatch(getProjects())  // Esto es para cuando cambiemos a la base de datos porque ahora esta mostrando solo 5 projectos y solo 5 usuarios que son los basicos
    dispatch(getCategories());
    dispatch(getSubcategories());
  });

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
    const user = users.find((u) => u.userId === id);
    const banUser = { ...user, baned: true };

    dispatch(updateUser(banUser));
  };

  const handleChangeCategory = (e) => {
    setNewCategory({
      categoryId: `${categories.length + 1}`,
      category: e.target.value,
    });
  };

  const handleNewCategory = (e) => {
    e.preventDefault();
    dispatch(addCategory(newCategory))
      .then(() => {
        console.log("Se agrego la nueva categoria correctamente");
      })
      .catch((err) =>
        console.error("No se pudo agregar la nueva categoria:", err)
      );
    setShowFormCategory(false);
  };

  const handleDeleteCategory = (id) => {
    const toDelete = categories.find((c) => c.categoryId === id);

    dispatch(dedeleteCategoryleteUser(toDelete.categoryId))
      .then(() => {
        console.log("Se borro la categoria correctamente");
      })
      .catch((err) => console.error("No se pudo borro la categoria:", err));
  };

  const handleChangeSubcategory = (e) => {
    setNewSubcategory({
      subcategoryId: `${subCategories.length + 1}`,
      subcategory: e.target.value,
    });
  };

  const handleNewSubCategory = (e) => {
    e.preventDefault();

    dispatch(addSubcategory(newSubcategory))
      .then(() => {
        console.log("Se agrego correctamente");
      })
      .catch((err) => console.error("No se pudo agregar:", err));
  };

  const deleteSubCategory = (id) => {
    const subC = subCategories.find(sc => sc.subcategoryId === id)

    dispatch(deleteSubCategory(subC.subcategoryId))
      .then(() => {
        console.log("Se borro la categoria correctamente");
      })
      .catch((err) => console.error("No se pudo borro la categoria:", err));
  };

  // Añadir que se puedan agregar categorias y subcategorias
  return (
    <div className="containerDashboard d-flex flex-column align-items-center">
      <h1>Dashboard Admin</h1>
      <hr />
      <h3>Categorias</h3>
      <button
        type="button"
        className="btn btn-create"
        onClick={() => setShowFormCategory(!showFormCategory)}
      >
        {!showFormCategory ? "Añadir Categoria" : "Cancelar"}
      </button>
      {showFormCategory && (
        <form className="group-input flex-row" onSubmit={handleNewCategory}>
          <input
            type="text"
            name="category"
            id="add-category"
            className="form-control"
            onChange={handleChangeCategory}
            placeholder="Nueva Categoria"
          />
          <button type="submit" className="btn btn-primary">
            Añadir
          </button>
        </form>
      )}
      <div className="categories-container d-flex gap-2 p-2">
        {categories.map((c) => (
          <div key={c.categoryId} className="category-control">
            <p>{c.category}</p>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteCategory(c.categoryId)}
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
      <h4>Subcategorias</h4>
      <button
        type="button"
        className="btn btn-create"
        onClick={() => setShowFormSubCategory(!showFormSubCategory)}
      >
        {!showFormSubCategory ? "Añadir Subcategoria" : "Cancelar"}
      </button>
      {showFormSubCategory && (
        <form className="group-input flex-row" onSubmit={handleNewSubCategory}>
          <input
            type="text"
            name="subcategory"
            id="add-category"
            className="form-control"
            onChange={handleChangeSubcategory}
            placeholder="Nueva Subcategoria"
          />
          <button type="submit" className="btn btn-primary">
            Añadir
          </button>
        </form>
      )}
      <div className="subcategory-container d-flex gap-2 p-2">
        {subCategories.map((sc) => (
          <div key={sc.subcategoryId} className="category-control">
            <p>{sc.subcategory}</p>
            <button type="button" className="btn btn-danger" onClick={() => deleteSubCategory(sc.subcategoryId)}>
              Borrar
            </button>
          </div>
        ))}
      </div>
      <hr />
      <h3>Usuarios</h3>
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
