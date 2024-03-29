import { useEffect, useState } from "react";
import { getUsers } from "../Utils/api";
import styles from "../CSS/Users.module.css";
import { ErrorPage } from "./ErrorPage";
import { Link } from "react-router-dom";

export const Users = () => {
  const [loading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setIsLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading Users...</p>;
  }

  if (err) {
    return (
      <div>
        <ErrorPage err={err} />
      </div>
    );
  }
  return (
    <section className={styles.section}>
      <h3>All Users</h3>
      <ul className={styles.usersBox}>
        {users.map((user) => {
          return (
            <div key={user.username} className={styles.singleUserBox}>
              <Link to={`/users/${user.username}`}>
                <article>
                  <h3>{user.username}</h3>
                  <img
                    src={user.avatar_url}
                    alt={user.username}
                    className={styles.userImage}
                  ></img>
                </article>
              </Link>
            </div>
          );
        })}
      </ul>
    </section>
  );
};
