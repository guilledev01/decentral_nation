import { useEffect, useRef, useState } from "react";
import { LogoIcon } from "../../svgs";
import { useMatchMedia } from "../../../hooks";
import { FadeEffect, LightSpeedEffect, ZoomEffect } from "../../animations";
import { Button } from "../../elements";

const ROUTES = [
  {
    title: "Home",
    href: "#home",
    className: "dark-1",
    min: 100,
    max: 400,
  },
  {
    title: "Decentralization",
    href: "#decentralization",
    className: "dark-2",
    min: 400,
    max: 1200,
  },
  {
    title: "Our services",
    href: "#services",
    className: "dark-3",
    min: 1200,
    max: 2000,
  },
  {
    title: "About us",
    href: "#team",
    className: "dark-4",
    min: 2000,
    max: 2800,
  },
  {
    title: "Projetcs launched",
    href: "#projects",
    className: "dark-5",
    min: 2800,
    max: 3600,
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState(false);
  const isMobileResolution = useMatchMedia("(max-width:970px)", undefined);
  const nav = useRef();
  const btn = useRef();
  const container = useRef();

  useEffect(() => {
    const handleNav = (e) => {
      ROUTES.forEach(({ href, className }) => {
        var article = document.getElementById(href.slice(1));
        var rect = article.getBoundingClientRect();
        nav.current.classList.toggle(
          className,
          rect.top <= 0 && rect.bottom >= 0
        );
        if (isMobileResolution) {
          container.current.classList.toggle(
            className,
            rect.top <= 0 && rect.bottom >= 0
          );
        }
        if (rect.top <= 0 && rect.bottom >= 0 && hash !== href) {
          setHash(href);
        }
      });
    };

    const handleMenu = (e) => {
      e.preventDefault();
      if (open) {
        container.current.style.animation = "fadeOut 0.2s ease-in-out";
        setTimeout(() => setOpen(false), 200);
      } else {
        setOpen(true);
        container.current.style.animation = "fadeIn 0.2s ease-in-out";
      }
      btn.current.classList.toggle("open");
      container.current.classList.toggle("open");
    };

    let actionBtn = btn.current;
    window.addEventListener("scroll", handleNav);
    if (isMobileResolution && hash) {
      window.addEventListener("hashchange", handleMenu);
      actionBtn.addEventListener("click", handleMenu);
    }

    return () => {
      window.removeEventListener("scroll", handleNav);
      if (isMobileResolution && hash) {
        window.removeEventListener("hashchange", handleMenu);
        actionBtn && actionBtn.removeEventListener("click", handleMenu);
      }
    };
  }, [btn, isMobileResolution, open, hash]);

  useEffect(() => {
    const hash = window.location.hash === "" ? "#home" : window.location.hash;

    let timer = setTimeout(() => {
      window.location.replace(hash);
      setHash(hash);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    isMobileResolution !== undefined && (
      <header id="home">
        <nav className="d-flex ai-c jc-sa" ref={nav}>
          <div className="logo d-flex ai-c jc-c gp-8">
            <LogoIcon />
            <div className="d-flex col ai-c jc-c">
              <h4 translate="no">Decentral</h4>
              <h4 translate="no">Nation</h4>
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
            {isMobileResolution &&
              open &&
              ROUTES.map(({ title, href }, id) => {
                return (
                  <FadeEffect
                    key={id}
                    top
                    delay={parseInt(`${id === 0 ? 0 : id * 2}00`)}
                    distance="30px"
                    duration={id === 0 ? 0 : 200}
                  >
                    <a
                      href={href}
                      className={`routes ${hash === href ? "active" : ""}`}
                    >
                      {title}
                    </a>
                  </FadeEffect>
                );
              })}
            {!isMobileResolution &&
              ROUTES.map(({ title, href }, id) => {
                return (
                  <FadeEffect
                    key={id}
                    left
                    delay={parseInt(`${id === 0 ? 0 : id * 2}00`)}
                    distance="30px"
                    duration={id === 0 ? 0 : 200}
                  >
                    <a
                      href={href}
                      className={`routes ${hash === href ? "active" : ""}`}
                    >
                      {title}
                    </a>
                  </FadeEffect>
                );
              })}
          </div>
        </nav>
        <div
          style={{ maxWidth: 800 }}
          className="hero d-flex col ai-c jc-c gp-16 m-center mt-32 mb-64 p-64"
        >
          <LightSpeedEffect left>
            <h2>Decentralize your business, secure your future.</h2>
            <ZoomEffect delay={1000} duration={500}>
              <div style={{ minWidth: 200 }}>
                <Button color="primary" titleA="BUILD WITH US" />
              </div>
            </ZoomEffect>
          </LightSpeedEffect>
        </div>
      </header>
    )
  );
}
