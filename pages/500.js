import Link from "next/link";
export default function Custom500() {
  return (
    <main className="d-flex col ai-c jc-c gp-16">
      <h2>Error 500 - Server-side error occurred</h2>
      <Link className="routes" href="/">
        Go Back Home
      </Link>
    </main>
  );
}
