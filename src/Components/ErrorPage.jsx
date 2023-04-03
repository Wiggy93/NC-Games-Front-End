import styles from "../CSS/ErrorPage.module.css";

export const ErrorPage = ({ err }) => {
  // if (!err.response)
  //   return (
  //     <section>
  //       <p>Error: {err.request.message}</p>
  //     </section>
  //   );

  return (
    <section className={styles.section}>
      <p>
        <b>Error Status Code: </b>
        {err.response.status}
      </p>
      <br></br>
      <p>
        <b>Error: </b>
        {err.response.data.message}
      </p>
    </section>
  );
};
