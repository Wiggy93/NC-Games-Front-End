export const ErrorPage = ({ err }) => {
  console.log(err, "actual error page");
  return (
    <section>
      <p>{err}</p>
      {/* <p>{err.response.data.msg}</p> */}
      {/* <p>{err.response.data.message}</p> */}
    </section>
  );
};
