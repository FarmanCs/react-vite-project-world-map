import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContex";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  console.log(user);
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
