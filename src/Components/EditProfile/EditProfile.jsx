import { useState } from "react";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    url: "",
  });
  const [errorProfile, setErrorProfile] = useState(null)

  const handleChangeProfile = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };


  const handleProfile = () => {}

  return (
    <>
      <div>
        <h2>Editar Perfil</h2>
        <form>
          <div>
            <label htmlFor="img-profile"></label>
            <input
              type="text"
              id="img-profile"
              name="image"
              value={profile.image}
              onChange={handleChangeProfile}
            />
          </div>
          <div>
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              name="username"
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
              name="url"
              value={profile.url}
              placeholder="Url Instagram"
              onChange={handleChangeProfile}
            />
          </div>

          <button type="button">Guardar Cambios</button>
        </form>
        <button>Borrar Cuenta</button>
      </div>
    </>
  );
};

export default EditProfile;
