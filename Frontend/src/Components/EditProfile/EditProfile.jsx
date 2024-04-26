import "./EditProfile.css";
import { useEffect, useState } from "react";
import { uploadImg } from "../../utils/uploadImg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../redux/actions/userActions";
import Error404 from "../Error404/Error404";
import cargarImagen from "../../assets/img/cargarImagen.jpg";

const EditProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navegation = useNavigate();
  const isAuth = useSelector((state) => state.userLogged);

  const currentUser = useSelector((state) =>
    state.users.find((u) => u.userId === userId)
  );

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    image: "",
    url: "",
  });

  useEffect(() => {
    dispatch(getUserById(userId));
    window.scrollTo(0, 0);
  }, [dispatch, userId]);

  useEffect(() => {
    if (currentUser) {
      setProfile({
        username: currentUser.username,
        email: currentUser.email,
        image: currentUser.image,
        url: currentUser.url,
      });
    }
  }, [currentUser]);

  const handleImageProfile = async (e) => {
    const imgProfile = await uploadImg(e);
    setProfile({ ...profile, image: imgProfile });
  };

  const handleDeleteImage = () => {
    setProfile({ ...profile, image: "" });
  };

  const handleChangeProfile = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfile = () => {
    dispatch(updateUser(profile));
  };

  const deleteUser = () => {
    dispatch(deleteUser(userId)).then(navegation("/"));
  };

  if (!currentUser && !isAuth) {
    return <Error404 />;
  }

  return (
    <>
      <div className="edit-profile-container bg-body-tertiary">
        <h3 className="text-center">Editar Perfil</h3>
        <form className="profile-form">
          <div>
            <div className="image-container-profile">
              {profile.image ? (
                <img
                  src={profile.image}
                  className="show-img-profile"
                  alt="Imagen seleccionada"
                />
              ) : (
                <img
                  src={cargarImagen}
                  className="show-img-profile"
                  alt="Imagen seleccionada"
                />
              )}
              {profile.image && (
                <button onClick={handleDeleteImage} className="btn btn-danger">
                  Eliminar Imagen
                </button>
              )}
            </div>
            {!profile.image && (
              <div
                className="group-input-profile"
                style={{ height: "2.45rem" }}
              >
                <input
                  type="file"
                  id="img-profile"
                  name="image"
                  className="form-control input-profile"
                  onChange={handleImageProfile}
                />
              </div>
            )}
          </div>
          <div className="group-input-profile">
            <label htmlFor="username">Nombre:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control input-profile"
              placeholder="Nombre"
              value={profile.username}
              onChange={handleChangeProfile}
            />
          </div>
          <div className="group-input-profile">
            <label htmlFor="username-profile">Email:</label>
            <input
              type="text"
              id="username-profile"
              className="form-control input-profile"
              name="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleChangeProfile}
            />
          </div>
          <div className="group-input-profile">
            <label htmlFor="url-profile">Url de Instagram:</label>
            <input
              type="text"
              id="url-profile"
              className="form-control input-profile"
              name="url"
              value={profile.url}
              placeholder="Url Instagram"
              onChange={handleChangeProfile}
            />
          </div>

          <button
            type="button"
            className="btn efectoBoton"
            onClick={() => handleProfile()}
          >
            Guardar Cambios
          </button>
        </form>
        <div className="danger-zone">
          <h4>Zona de peligro!</h4>
          <p>Tu cuenta se borrara cuando hagas click en el boton</p>
          <button className="btn btn-danger" onClick={() => deleteUser()}>
            Borrar Cuenta
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
