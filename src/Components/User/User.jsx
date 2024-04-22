import { useNavigate } from "react-router-dom";
import "./User.css";

const User = ({ userInfo }) => {

  const navegador = useNavigate()
  navegador(`/user/1`)

  const { userPhoto, user } = userInfo
  return (
    <>
      <div>
        <div>
          <img src={userPhoto} alt="User profile" />
          <h3>{user}</h3>
        </div>
        <div>
          <h2>Projects</h2>
        </div>
      </div>
    </>
  );
};

export default User;
