import Link from "next/link";
export default function Custom404() {
  return (
    <main className="d-flex col ai-c jc-c gp-16">
      <h2>Error 404 - Page Not Found</h2>
      <Link className="routes" href="/">
        Go Back Home
      </Link>
    </main>
  );
}
