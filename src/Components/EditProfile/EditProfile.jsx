import "./EditProfile.css"
import { useEffect, useState } from "react";
import { uploadImg } from "../../utils/uploadImg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../redux/actions/userActions";
import Error404 from "../Error404/Error404";

const EditProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) =>
    state.users.find((u) => u.userId === userId)
  );

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    url: "",
  });

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  console.log(currentUser)

  useEffect(() => {
    if (currentUser) {
      setProfile({
        username: currentUser.username,
        email: currentUser.email,
        password: currentUser.password,
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
    dispatch(deleteUser(userId))
  }

  console.log(currentUser)

  if (!currentUser) {
    return <Error404/>
  }

  return (
    <>
      <div className="edit-profile-container">
        <h3 className="text-center">Editar Perfil</h3>
        <form>
          <div>
            <label htmlFor="img-profile"></label>
            <input
              type="file"
              id="img-profile"
              name="image"
              className="form-control"
              onChange={handleImageProfile}
            />
            {profile.image && (
              <button
                onClick={handleDeleteImage}
                className="btn btn-danger deleteImgCp"
              >
                Eliminar Imagen
              </button>
            )}
          </div>
          <div>
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Nombre"
              value={profile.username}
              onChange={handleChangeProfile}
            />
          </div>
          <div>
            <label htmlFor="username-profile"></label>
            <input
              type="text"
              id="username-profile"
              className="form-control"
              name="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleChangeProfile}
            />
          </div>
          <div>
            <label htmlFor="password-profile"></label>
            <input
              type="password"
              id="password-profile"
              name="password"
              className="form-control"
              value={profile.password}
              placeholder="Contraseña"
              onChange={handleChangeProfile}
            />
          </div>
          <div>
            <label htmlFor="url-profile"></label>
            <input
              type="text"
              id="url-profile"
              className="form-control"
              name="url"
              value={profile.url}
              placeholder="Url Instagram"
              onChange={handleChangeProfile}
            />
          </div>

          <button type="button" onClick={() => handleProfile()}>
            Guardar Cambios
          </button>
        </form>
        <button className="btn btn-danger deleteImgCp" onClick={() => deleteUser()}>Borrar Cuenta</button>
      </div>
    </>
  );
};

export default EditProfile;
