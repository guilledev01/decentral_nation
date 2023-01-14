import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { LogoIcon } from "../../svgs";
import { useMatchMedia } from "../../../hooks";
import { ParticleConfig } from "../../../utils/particles";

const ROUTES = [
  { title: "Home", route: "/" },
  { title: "Projects", route: "/projects" },
  { title: "Services", route: "/services" },
  { title: "Team", route: "/team" },
];

export default function Header() {
  const router = useRouter();
  const btn = useRef();
  const container = useRef();
  const isMobileResolution = useMatchMedia("(max-width:970px)", false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    btn.current &&
      isMobileResolution &&
      btn.current.addEventListener("click", handleMenu);

    return () =>
      btn.current &&
      isMobileResolution &&
      btn.current.removeEventListener("click", handleMenu);
  }, [isMobileResolution]);

  const handleMenu = (e) => {
    e.stopPropagation();
    btn.current.classList.toggle("open");
    container.current.classList.toggle("open");
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    setLoad(true);
  }, []);

  return (
    <header>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={ParticleConfig}
      />
      <nav className="d-flex ai-c jc-sa">
        <div className="logo d-flex ai-c jc-c gp-8">
          <LogoIcon />
          <div className="d-flex col ai-c jc-c mt-4">
            <h4>Software</h4>
            <h4>Factory</h4>
          </div>
        </div>

        {isMobileResolution && (
          <div id="menu-icon" ref={btn}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div
          className={
            isMobileResolution
              ? "menu-container d-flex col ai-c jc-c gp-32 p-32"
              : "d-flex ai-c jc-c gp-32"
          }
          ref={isMobileResolution ? container : null}
        >
          {ROUTES.map(({ title, route }, id) => {
            return (
              <a
                key={id}
                onClick={() => router.push(route)}
                className={`routes ${router.asPath === route ? "active" : ""}`}
              >
                {title}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
