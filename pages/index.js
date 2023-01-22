import {
  About,
  Decentralization,
  Projects,
  Services,
} from "../components/sections";
import { useMatchMedia } from "../hooks";

export default function HomePage() {
  const isMobileResolution = useMatchMedia("(max-width:970px)", undefined);
  return (
    <>
      <Decentralization isMobileResolution={isMobileResolution} />
      <Services />
      <About isMobileResolution={isMobileResolution} />
      <Projects />
    </>
  );
}
