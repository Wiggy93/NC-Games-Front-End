import { useEffect, useState } from "react";
import { getUsers } from "../Utils/api";
import styles from "../CSS/Users.module.css";

export const Users = () => {
  const [loading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading Users...</p>;
  }
  return (
    <section>
      <h3>All Users</h3>
      <ul className={styles.usersBox}>
        {users.map((user) => {
          return (
            <div key={user.username} className={styles.singleUserBox}>
              <h3>{user.username}</h3>
              <p>{user.name}</p>
              <img
                src={user.avatar_url}
                alt={user.username}
                className={styles.userImage}
              ></img>
            </div>
          );
        })}
      </ul>
    </section>
  );
};
