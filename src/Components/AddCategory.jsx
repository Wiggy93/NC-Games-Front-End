import { useContext, useState } from "react";
import { UserContext } from "../Contexts/userContext";
import styles from "../CSS/AddCategory.module.css";
import { postCategory } from "../Utils/api";
import { ErrorPage } from "./ErrorPage";

export const AddCategory = ({ setPostedMessage, setMessage }) => {
  const currentUser = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    postCategory({
      slug: slug,
      description: description,
    })
      .then(() => {
        setMessage(`${slug} Posted`);
        setIsLoading(false);
        setPostedMessage({ display: "block" });
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setMessage(
          "Error adding category, please see error message and try again"
        );
        setIsLoading(false);
      });
  };

  if (isLoading) return <p>Posting new category...</p>;

  if (err) {
    return (
      <section>
        <ErrorPage err={err} />
        <p>Error posting - resubmit</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="slugBody">Category Title</label>
          <textarea
            type="text"
            id="slugBody"
            value={slug}
            required
            onChange={(e) => setSlug(e.target.value)}
          ></textarea>
          <label htmlFor="descriptionBody">Description</label>
          <textarea
            type="text"
            id="decriptionBody"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">Create New Category</button>
        </form>
      </section>
    );
  }

  return (
    <section className={styles.postCategory}>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <label htmlFor="slugBody" className={styles.label}>
          Category Title
        </label>
        <textarea
          type="text"
          id="slugBody"
          value={slug}
          required
          onChange={(e) => setSlug(e.target.value)}
          className={styles.textBox}
        ></textarea>
        <br></br>
        <label htmlFor="descriptionBody" className={styles.label}>
          Description
        </label>
        <textarea
          type="text"
          id="decriptionBody"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textBox}
        ></textarea>
        <br></br>
        <button type="submit">Create New Category</button>
      </form>
    </section>
  );
};
