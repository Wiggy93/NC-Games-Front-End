export const ErrorPage = ({err}) => {
    return (
        <section>
            <p>{err.response.data.message}</p>
        </section>
    )
}