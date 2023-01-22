import Link from "next/link";
import { useNavigation } from "../../../hooks";
import { FadeEffect, LightSpeedEffect, ZoomEffect } from "../../animations";
import { Button, Logo } from "../../elements";

const BuildButton = ({ handleRoute }) => {
  return (
    <ZoomEffect delay={1000} duration={500}>
      <div style={{ minWidth: 200 }}>
        <Button
          color="primary"
          titleA="BUILD WITH US"
          onClick={() => handleRoute("/request-budget")}
        />
      </div>
    </ZoomEffect>
  );
};

export default function Header() {
  const {
    PATH,
    hash,
    isMobileResolution,
    nav,
    btn,
    container,
    router,
    handleMenu,
    handleRoute,
  } = useNavigation();

  return (
    isMobileResolution !== undefined && (
      <header
        id="home"
        style={{ height: router.pathname === "/" ? 500 : "100%" }}
        className="d-flex ai-c jc-c"
      >
        <nav
          className={`d-flex ai-c ${isMobileResolution ? "jc-sb" : "jc-sa"}`}
          ref={nav}
        >
          <div onClick={() => handleRoute("/")}>
            <Logo /> Hi
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
            {PATH.filter((path) =>
              router.pathname === "/" ? !path.route : path.route
            ).map(({ title, id, route }, index) => {
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
              <BuildButton handleRoute={handleRoute} />
            )}
          </div>
        </nav>
        {router.pathname === "/" && (
          <div
            style={{ maxWidth: 600 }}
            className="d-flex col ai-c jc-c gp-16 pt-64"
          >
            <LightSpeedEffect left>
              <h2>Decentralize your business, secure your future.</h2>
              <BuildButton handleRoute={handleRoute} />
            </LightSpeedEffect>
          </div>
        )}
      </header>
    )
  );
}
