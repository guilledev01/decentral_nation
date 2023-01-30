import Link from "next/link";

function Error({ statusCode }) {
  return (
    <main className="d-flex col ai-c jc-c gp-16">
      <h2>Error - {statusCode}</h2>
      <Link className="routes" href="/">
        Go Back Home
      </Link>
    </main>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
