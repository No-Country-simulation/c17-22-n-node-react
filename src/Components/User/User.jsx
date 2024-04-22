import { Link, useParams } from "react-router-dom";
import "./User.css";
import { getProjects, getUsers } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Error404 from "../Error404/Error404";

const User = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const projects = useSelector((state) => state.projectsOnScreen);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProjects());
  }, [dispatch]);

  const user = users.filter((d) => d.userId === userId);
  const ofTheUser = projects.filter((d) => d.entrepreneurId === userId);

  if (user.length === 0) {
    return <Error404 />;
  }

  return (
    <>
      <div className="d-flex flex-column bg-body-tertiary justify-content-center align-items-center">
        <div className="user-container d-flex gap-5 bg-body-tertiary justify-content-center align-items-center mt-3">
          <img src={user[0].image} alt="User profile" className="img-fluid" />
          <div className="user-info">
            <h2> {user[0].username} </h2>
            <a href={user[0].url} target="_blank">
              Contacto
            </a>
          </div>
        </div>
        <div>
          <h5 className="text-center mt-4">Projectos Creados</h5>
          <ul>
            {ofTheUser.length === 0 ? (
              <li>Este usuario no tiene ningun proyecto</li>
            ) : (
              ofTheUser.map((p) => {
                console.log(p);
                return (
                  <li key={p.entrepreneurId}>
                    <Link to={`/project/${p.entrepreneurshipId}`}>{p.name}</Link>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default User;
