export default function HomePage() {
  return (
    <>
      <article id="decentralization">
        <h4>Header 1</h4>
      </article>
      <article id="services">
        <h4>Header 2</h4>
      </article>
      <article id="team">
        <h4>Header 3</h4>
      </article>
      <article id="projects">
        <h4>Header 4</h4>
      </article>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {},
  };
}
