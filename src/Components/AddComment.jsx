import { useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { postComment } from "../Utils/api";
import styles from "../CSS/AddComment.module.css";

export const AddComment = ({
  currentUser,
  setMessage,
  message,
  setPostedMessage,
}) => {
  const { reviewid } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [postBody, setPostBody] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    postComment(reviewid, {
      username: currentUser,
      body: postBody,
    })
      .then(() => {
        setMessage("Comment Posted");
        setIsLoading(false);
        setPostedMessage({ display: "block" });
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setIsLoading(false);
      });
  };

  if (isLoading) return <p>Sending comment...</p>;

  if (err) {
    return (
      <div className={styles.postComment}>
        <ErrorPage err={err} />

        <form onSubmit={handleSubmit}>
          <label htmlFor="postBody">Comment: </label>
          <textarea
            type="text"
            id="postBody"
            value={postBody}
            required
            onChange={(e) => {
              setPostBody(e.target.value);
            }}
          ></textarea>
          <button type="submit">Post Comment</button>
        </form>
      </div>
    );
  }

  return (
    <section className={styles.postComment}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postBody">Comment: </label>
        <textarea
          type="text"
          id="postBody"
          value={postBody}
          required
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
        ></textarea>
        <button type="submit">Post Comment</button>
        <br></br>
      </form>
    </section>
  );
};
