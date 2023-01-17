import {
  Decentralization,
  Services,
  About,
  Projects,
} from "../components/sections";
import { useMatchMedia } from "../hooks";

export default function HomePage() {
  const isMobileResolution = useMatchMedia("(max-width:970px)", undefined);
  return (
    <>
      <Decentralization isMobileResolution={isMobileResolution} />
      <Services />
      <About />
      <Projects />
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
