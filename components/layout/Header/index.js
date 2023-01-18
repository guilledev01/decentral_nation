import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMatchMedia } from "../../../hooks";
import { FadeEffect, LightSpeedEffect, ZoomEffect } from "../../animations";
import { Button, Logo } from "../../elements";

const HREF = [
  {
    title: "Home",
    href: "#home",
    className: "dark-1",
  },
  {
    title: "Decentralization",
    href: "#decentralization",
    className: "dark-2",
  },
  {
    title: "Our services",
    href: "#services",
    className: "dark-3",
  },
  {
    title: "About us",
    href: "#team",
    className: "dark-4",
  },
  {
    title: "Projetcs launched",
    href: "#projects",
    className: "dark-5",
  },
];

const ROUTE = [
  {
    title: "Request budget",
    route: "/request-budget",
  },
  {
    title: "Contact",
    route: "/contact",
  },
  {
    title: "Privacy Policy",
    route: "/privacy-policy",
  },
  {
    title: "Legal Warning",
    route: "/legal-warning",
  },
  {
    title: "Cookies Policy",
    route: "/cookies-policy",
  },
];

const BuildButton = ({ router }) => {
  return (
    <ZoomEffect delay={1000} duration={500}>
      <div style={{ minWidth: 200 }}>
        <Button
          color="primary"
          titleA="BUILD WITH US"
          onClick={() => router.push(ROUTE[0].route)}
        />
      </div>
    </ZoomEffect>
  );
};

const HrefHeader = ({ hash, handleMenu }) => {
  return HREF.map(({ title, href }, id) => {
    return (
      <FadeEffect
        key={id}
        top
        delay={parseInt(`${id === 0 ? 0 : id * 2}00`)}
        distance="30px"
        duration={id === 0 ? 0 : 200}
      >
        <a
          onClick={() => handleMenu && handleMenu()}
          href={href}
          className={`routes ${hash === href ? "active" : ""}`}
        >
          {title}
        </a>
      </FadeEffect>
    );
  });
};

const RouteHeader = ({ router, handleMenu }) => {
  return ROUTE.map(({ title, route }, id) => {
    return (
      <FadeEffect
        key={id}
        top
        delay={parseInt(`${id === 0 ? 0 : id * 2}00`)}
        distance="30px"
        duration={id === 0 ? 0 : 200}
      >
        <Link
          onClick={() => handleMenu && handleMenu()}
          href={route}
          className={`routes ${router.pathname === route ? "active" : ""}`}
        >
          {title}
        </Link>
      </FadeEffect>
    );
  });
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState(HREF[0].href);
  const isMobileResolution = useMatchMedia("(max-width:970px)", undefined);
  const nav = useRef();
  const btn = useRef();
  const container = useRef();
  let router = useRouter();

  const handleMenu = useCallback(
    (e) => {
      if (open) {
        container.current.style.animation = "fadeOut 0.2s ease-in-out";
        setTimeout(() => setOpen(false), 200);
      } else {
        setOpen(true);
        container.current.style.animation = "fadeIn 0.2s ease-in-out";
      }
      btn.current.classList.toggle("open");
      container.current.classList.toggle("open");
    },
    [open]
  );

  useEffect(() => {
    let actionBtn = btn.current;
    let elNav = nav.current;
    let elContainer = container.current;

    const resetNav = () => {
      setHash(HREF[0].href);
      elNav &&
        HREF.forEach(({ className }) => {
          const isToogle = elNav.classList.contains(className);
          isToogle && elNav.classList.remove(className);
          isMobileResolution &&
            isToogle &&
            elContainer.classList.remove(className);
        });
    };

    const handleNav = (e) => {
      if (router.pathname === "/") {
        HREF.forEach(({ href, className }) => {
          var article = document.getElementById(href.slice(1));
          var rect = article.getBoundingClientRect();
          elNav.classList.toggle(
            className,
            href === HREF[0].href
              ? rect.top < 0 && rect.bottom >= 45
              : rect.top <= 45 && rect.bottom >= 45
          );
          if (isMobileResolution) {
            elContainer.classList.toggle(
              className,
              rect.top <= 45 && rect.bottom >= 45
            );
          }
          if (rect.top <= 45 && rect.bottom >= 45 && hash !== href) {
            setHash(href);
          }
        });
      } else {
        resetNav();
        elNav.classList.toggle(HREF[0].className, window.scrollY > 0);
        isMobileResolution &&
          elContainer.classList.toggle(HREF[0].className, window.scrollY > 0);
      }
    };

    window.addEventListener("scroll", handleNav);
    isMobileResolution && actionBtn.addEventListener("click", handleMenu);

    return () => {
      window.removeEventListener("scroll", handleNav);
      isMobileResolution &&
        actionBtn &&
        actionBtn.removeEventListener("click", handleMenu);
    };
  }, [btn, nav, container, isMobileResolution, open, hash, router, handleMenu]);

  return (
    isMobileResolution !== undefined && (
      <header
        id="home"
        style={{ height: router.pathname === "/" ? 500 : "100%" }}
        className="d-flex ai-c jc-c"
      >
        <nav className="d-flex ai-c jc-sa p-4" ref={nav}>
          <Logo />
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
              (router.pathname === "/" ? (
                <>
                  <HrefHeader handleMenu={handleMenu} hash={hash} />
                  <BuildButton router={router} />
                </>
              ) : (
                <RouteHeader handleMenu={handleMenu} router={router} />
              ))}
            {!isMobileResolution &&
              (router.pathname === "/" ? (
                <>
                  <HrefHeader hash={hash} />
                  <BuildButton router={router} />
                </>
              ) : (
                <RouteHeader router={router} />
              ))}
          </div>
        </nav>
        {router.pathname === "/" && (
          <div
            style={{ maxWidth: 600 }}
            className="d-flex col ai-c jc-c gp-16 pt-64"
          >
            <LightSpeedEffect left>
              <h2>Decentralize your business, secure your future.</h2>
              <BuildButton />
            </LightSpeedEffect>
          </div>
        )}
      </header>
    )
  );
}
