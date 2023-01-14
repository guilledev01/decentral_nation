import { useContext } from "react";
import { GlobalContext } from "../utils/context";
import { Button } from "../components/elements";
import { LightSpeedEffect, ZoomEffect } from "../components/animations";

export default function HomePage() {
  const { localStorage } = useContext(GlobalContext);

  return (
    <>
      <LightSpeedEffect left>
        <div
          style={{ width: 800 }}
          className="d-flex col ai-c jc-c gp-16 m-center mt-64 mb-64 p-64"
        >
          <div>
            <h3>Start your decentralized project today</h3>
            <h3>and build the future together!</h3>
          </div>

          <ZoomEffect delay={1000}>
            <div style={{ width: 200 }}>
              <Button color="primary" titleA="DEVELOP WITH US" />
            </div>
          </ZoomEffect>
        </div>
      </LightSpeedEffect>

      <article>
        <h4>Features</h4>
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
