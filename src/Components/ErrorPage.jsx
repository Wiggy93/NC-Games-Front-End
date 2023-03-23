export const ErrorPage = ({ err }) => {
  return (
    <section>
      <p>{err.response.data.msg}</p>
      <p>{err.response.data.message}</p>
    </section>
  );
};
