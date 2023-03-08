import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import Avalanche from "../../../assets/imgs/avalanche.svg";
import BSC from "../../../assets/imgs/bsc.svg";
import Chainlink from "../../../assets/imgs/chainlink.svg";
import Ethereum from "../../../assets/imgs/ethereum.svg";
import Polygon from "../../../assets/imgs/polygon.svg";
import Solana from "../../../assets/imgs/solana.svg";
import Uniswap from "../../../assets/imgs/uniswap.svg";
import { useNavigation } from "../../../hooks";
import { FadeEffect, LightSpeedEffect, ZoomEffect } from "../../animations";
import { Button, Logo } from "../../elements";

const BuildButton = ({ handleRoute, text }) => {
  return (
    <ZoomEffect delay={1000} duration={500}>
      <div style={{ minWidth: 200 }}>
        <Button
          color="primary"
          titleA={text}
          onClick={() => handleRoute("/request-budget")}
        />
      </div>
    </ZoomEffect>
  );
};

export default function Header() {
  const {
    path,
    open,
    hash,
    isMobileResolution,
    nav,
    btn,
    container,
    router,
    handleMenu,
    handleRoute,
  } = useNavigation();
  const { t } = useTranslation("common");
  const hero = t("hero", {}, { returnObjects: true });

  const particlesInit = useCallback(async (engine) => {
    const loadFull = (await import("tsparticles")).loadFull;
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  const Routes = useCallback(
    ({ path, hash, router, handleMenu, handleRoute }) => {
      return (
        <>
          {path
            .filter((path) =>
              router.pathname === "/" ? !path.route : path.route
            )
            .map(({ title, id, route }, index) => {
              return (
                <FadeEffect
                  key={id}
                  top
                  delay={parseInt(`${index + 1 * 3}00`)}
                  distance="30px"
                  duration={200}
                >
                  {route ? (
                    <Link
                      onClick={() => isMobileResolution && handleMenu()}
                      href={route}
                      className={`routes ${
                        router.pathname === route ? "active" : ""
                      }`}
                    >
                      {title}
                    </Link>
                  ) : (
                    <a
                      onClick={() => isMobileResolution && handleMenu()}
                      href={id}
                      className={`routes ${hash === id ? "active" : ""}`}
                    >
                      {title}
                    </a>
                  )}
                </FadeEffect>
              );
            })}
          {router.pathname === "/" && (
            <BuildButton handleRoute={handleRoute} text={hero.btn} />
          )}
        </>
      );
    },
    [isMobileResolution, open, hero.btn]
  );

  return (
    <header
      id="home"
      style={{ height: router.pathname === "/" ? 500 : "100%" }}
      className="d-flex ai-c jc-c"
    >
      {router.pathname === "/" && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            autoPlay: true,
            detectRetina: true,
            duration: 0,
            fpsLimit: 30,
            interactivity: {
              detectsOn: "window",
              events: {
                onHover: {
                  enable: true,
                  mode: "bubble",
                  parallax: {
                    enable: false,
                    force: 60,
                    smooth: 10,
                  },
                },
              },
              modes: {
                attract: {
                  distance: 200,
                  duration: 0.4,
                  easing: "ease-out-quad",
                  factor: 1,
                  maxSpeed: 50,
                  speed: 1,
                },
                bounce: {
                  distance: 200,
                },
                bubble: {
                  distance: 400,
                  duration: 2,
                  mix: false,
                  opacity: 0.8,
                  size: 40,
                  divs: {
                    distance: 200,
                    duration: 0.4,
                    mix: false,
                    selectors: [],
                  },
                },
                connect: {
                  distance: 80,
                  links: {
                    opacity: 0.5,
                  },
                  radius: 60,
                },
                grab: {
                  distance: 400,
                  links: {
                    blink: false,
                    consent: false,
                    opacity: 1,
                  },
                },
                push: {
                  default: true,
                  groups: [],
                  quantity: 4,
                },
                remove: {
                  quantity: 2,
                },
                slow: {
                  factor: 3,
                  radius: 200,
                },
                trail: {
                  delay: 1,
                  pauseOnStop: false,
                  quantity: 1,
                },
                light: {
                  area: {
                    gradient: {
                      start: {
                        value: "#000fff",
                      },
                      stop: {
                        value: "#000000",
                      },
                    },
                    radius: 1000,
                  },
                  shadow: {
                    color: {
                      value: "#000000",
                    },
                    length: 2000,
                  },
                },
              },
            },
            manualParticles: [],
            particles: {
              bounce: {
                horizontal: {
                  random: {
                    enable: false,
                    minimumValue: 0.1,
                  },
                  value: 1,
                },
                vertical: {
                  random: {
                    enable: false,
                    minimumValue: 0.1,
                  },
                  value: 1,
                },
              },
              collisions: {
                absorb: {
                  speed: 2,
                },
                bounce: {
                  horizontal: {
                    random: {
                      enable: false,
                      minimumValue: 0.1,
                    },
                    value: 1,
                  },
                  vertical: {
                    random: {
                      enable: false,
                      minimumValue: 0.1,
                    },
                    value: 1,
                  },
                },
                enable: false,
                mode: "bounce",
                overlap: {
                  enable: true,
                  retries: 0,
                },
              },
              color: {
                value: "#000fff",
                animation: {
                  h: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    decay: 0,
                    sync: true,
                  },
                  s: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    decay: 0,
                    sync: true,
                  },
                  l: {
                    count: 0,
                    enable: false,
                    offset: 0,
                    speed: 1,
                    decay: 0,
                    sync: true,
                  },
                },
              },
              groups: {},
              move: {
                angle: {
                  offset: 0,
                  value: 90,
                },
                attract: {
                  distance: 200,
                  enable: false,
                  rotate: {
                    x: 600,
                    y: 1200,
                  },
                },
                center: {
                  x: 50,
                  y: 50,
                  mode: "percent",
                  radius: 0,
                },
                decay: 0,
                distance: {},
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                  acceleration: 9.81,
                  enable: false,
                  inverse: false,
                  maxSpeed: 50,
                },
                path: {
                  clamp: true,
                  delay: {
                    random: {
                      enable: false,
                      minimumValue: 0,
                    },
                    value: 0,
                  },
                  enable: false,
                  options: {},
                },
                outModes: {
                  default: "out",
                  bottom: "out",
                  left: "out",
                  right: "out",
                  top: "out",
                },
                random: false,
                size: false,
                speed: 2,
                spin: {
                  acceleration: 0,
                  enable: false,
                },
                straight: false,
                trail: {
                  enable: false,
                  length: 10,
                  fill: {},
                },
                vibrate: false,
                warp: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 1920,
                  height: 1080,
                },
                limit: 14,
                value: 50,
              },
              opacity: {
                random: {
                  enable: true,
                  minimumValue: 0.1,
                },
                value: {
                  min: 0.1,
                  max: 1,
                },
                animation: {
                  count: 0,
                  enable: true,
                  speed: 1,
                  decay: 0,
                  sync: false,
                  destroy: "none",
                  startValue: "random",
                  minimumValue: 0.2,
                },
              },
              reduceDuplicates: false,
              shadow: {
                blur: 0,
                color: {
                  value: "#000",
                },
                enable: false,
                offset: {
                  x: 0,
                  y: 0,
                },
              },
              shape: {
                options: {
                  character: {
                    fill: false,
                    font: "Verdana",
                    style: "",
                    value: "*",
                    weight: "400",
                  },
                  char: {
                    fill: false,
                    font: "Verdana",
                    style: "",
                    value: "*",
                    weight: "400",
                  },
                  polygon: {
                    sides: 5,
                  },
                  star: {
                    sides: 5,
                  },
                  image: [
                    {
                      src: BSC.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Ethereum.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Polygon.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Avalanche.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Solana.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Uniswap.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Chainlink.src,
                      width: 32,
                      height: 32,
                    },
                  ],
                  images: [
                    {
                      src: BSC.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Ethereum.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Polygon.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Avalanche.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Solana.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Uniswap.src,
                      width: 32,
                      height: 32,
                    },
                    {
                      src: Chainlink.src,
                      width: 32,
                      height: 32,
                    },
                  ],
                },
                type: "image",
              },
              size: {
                random: {
                  enable: false,
                  minimumValue: 1,
                },
                value: 16,
                animation: {
                  count: 0,
                  enable: false,
                  speed: 40,
                  decay: 0,
                  sync: false,
                  destroy: "none",
                  startValue: "random",
                  minimumValue: 0.1,
                },
              },
              stroke: {
                width: 0,
                color: {
                  value: "#000000",
                  animation: {
                    h: {
                      count: 0,
                      enable: false,
                      offset: 0,
                      speed: 1,
                      decay: 0,
                      sync: true,
                    },
                    s: {
                      count: 0,
                      enable: false,
                      offset: 0,
                      speed: 1,
                      decay: 0,
                      sync: true,
                    },
                    l: {
                      count: 0,
                      enable: false,
                      offset: 0,
                      speed: 1,
                      decay: 0,
                      sync: true,
                    },
                  },
                },
              },
              zIndex: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1,
              },
              life: {
                count: 0,
                delay: {
                  random: {
                    enable: false,
                    minimumValue: 0,
                  },
                  value: 0,
                  sync: false,
                },
                duration: {
                  random: {
                    enable: false,
                    minimumValue: 0.0001,
                  },
                  value: 0,
                  sync: false,
                },
              },
              rotate: {
                random: {
                  enable: true,
                  minimumValue: 0,
                },
                value: 0,
                animation: {
                  enable: true,
                  speed: 5,
                  decay: 0,
                  sync: false,
                },
                direction: "random",
                path: false,
              },
              destroy: {
                bounds: {},
                mode: "none",
                split: {
                  count: 1,
                  factor: {
                    random: {
                      enable: false,
                      minimumValue: 0,
                    },
                    value: 3,
                  },
                  rate: {
                    random: {
                      enable: false,
                      minimumValue: 0,
                    },
                    value: {
                      min: 4,
                      max: 9,
                    },
                  },
                  sizeOffset: true,
                  particles: {},
                },
              },
              roll: {
                darken: {
                  enable: false,
                  value: 0,
                },
                enable: false,
                enlighten: {
                  enable: false,
                  value: 0,
                },
                mode: "vertical",
                speed: 25,
              },
              tilt: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                enable: false,
              },
              twinkle: {
                lines: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
                particles: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
              },
              wobble: {
                distance: 5,
                enable: false,
                speed: {
                  angle: 50,
                  move: 10,
                },
              },
              orbit: {
                animation: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  sync: false,
                },
                enable: false,
                opacity: 1,
                rotation: {
                  random: {
                    enable: false,
                    minimumValue: 0,
                  },
                  value: 45,
                },
                width: 1,
              },
              links: {
                blink: false,
                color: {
                  value: "#000",
                },
                consent: false,
                distance: 150,
                enable: false,
                frequency: 1,
                opacity: 0.4,
                shadow: {
                  blur: 5,
                  color: {
                    value: "#000",
                  },
                  enable: false,
                },
                triangles: {
                  enable: false,
                  frequency: 1,
                },
                width: 1,
                warp: false,
              },
              repulse: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 0,
                enabled: false,
                distance: 1,
                duration: 1,
                factor: 1,
                speed: 1,
              },
            },
            pauseOnBlur: true,
            pauseOnOutsideViewport: true,
            responsive: [],
            smooth: false,
            style: {},
            themes: [],
            zLayers: 100,
          }}
        />
      )}
      <nav
        className={`d-flex ai-c ${isMobileResolution ? "jc-sb" : "jc-sa"}`}
        ref={nav}
      >
        <div onClick={() => handleRoute("/")}>
          <Logo />
        </div>
        <div id="menu-icon" ref={btn}>
          {isMobileResolution && (
            <>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </>
          )}
        </div>

        <div
          className={
            isMobileResolution
              ? "menu-container d-flex col ai-c jc-c gp-32 p-32"
              : "d-flex ai-c jc-c gp-32"
          }
          ref={container}
        >
          <Routes
            path={path}
            hash={hash}
            router={router}
            handleMenu={handleMenu}
            handleRoute={handleRoute}
          />
        </div>
      </nav>
      {router.pathname === "/" && (
        <div
          style={{ maxWidth: 600 }}
          className="d-flex col ai-c jc-c gp-16 pt-64"
        >
          <LightSpeedEffect left>
            <h2>{hero.title}</h2>
            <BuildButton handleRoute={handleRoute} text={hero.btn} />
          </LightSpeedEffect>
        </div>
      )}
    </header>
  );
}
