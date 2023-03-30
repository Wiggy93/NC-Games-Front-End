import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../Utils/api";
import styles from "../CSS/Users.module.css";
import { ErrorPage } from "./ErrorPage";

export const SingleUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { username } = useParams();
  const [currentSingleUser, setCurrentSingleUser] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getSingleUser(username).then((data) => {
      setCurrentSingleUser(data.user[0]);
      setIsLoading(false).catch((err) => {
        console.log(err, "err");
        setErr(err);
        setIsLoading(false);
      });
    });
  }, []);

  if (isLoading) return <p>Loading {username}'s details</p>;

  if (err) return <ErrorPage err={err} />;

  return (
    <section className={styles.section}>
      <h3>{currentSingleUser.name}</h3>
      <h4>{currentSingleUser.username}</h4>
      <img
        src={currentSingleUser.avatar_url}
        alt={currentSingleUser.username}
      ></img>
    </section>
  );
};
