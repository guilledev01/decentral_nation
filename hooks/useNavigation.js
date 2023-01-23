import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMatchMedia } from "./index";

// const PATH = [
//   {
//     title: "Home",
//     id: "#home",
//   },
//   {
//     title: "Decentralization",
//     id: "#decentralization",
//   },
//   {
//     title: "Our Services",
//     id: "#services",
//   },
//   {
//     title: "About Us",
//     id: "#team",
//   },
//   {
//     title: "Projetcs Launched",
//     id: "#projects",
//   },
//   {
//     title: "Request Budget",
//     id: "#request-budget",
//     route: "/request-budget",
//   },
//   {
//     title: "Contact Us",
//     id: "#contact-us",
//     route: "/contact-us",
//   },
//   {
//     title: "Privacy Policy",
//     id: "#privacy-policy",
//     route: "/privacy-policy",
//   },
//   {
//     title: "Legal Warning",
//     id: "#legal-warning",
//     route: "/legal-warning",
//   },
//   {
//     title: "Cookies Policy",
//     id: "#cookies-policy",
//     route: "/cookies-policy",
//   },
// ];

export default function useNavigation() {
  const { t } = useTranslation("common");
  const PATH = t("path", {}, { returnObjects: true });
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState(PATH[0].id);
  const isMobileResolution = useMatchMedia("(max-width:1370px)", undefined);
  const nav = useRef();
  const btn = useRef();
  const container = useRef();
  let router = useRouter();

  const handleMenu = useCallback(() => {
    if (open) {
      container.current.style.animation = "fadeOut 0.2s ease-in-out";
      setTimeout(() => setOpen(false), 200);
      btn.current.classList.remove("open");
      container.current.classList.remove("open");
    } else {
      container.current.style.animation = "fadeIn 0.2s ease-in-out";
      btn.current.classList.add("open");
      container.current.classList.add("open");
      setOpen(true);
    }
  }, [open]);

  const handleColor = ({ articleColor }) => {
    const navColor = window.getComputedStyle(nav.current).backgroundColor;
    if (navColor !== articleColor) {
      nav.current.style.backgroundColor = articleColor;
      nav.current.style.borderColor =
        articleColor === "rgba(0, 0, 0, 0)" ? articleColor : "white";
    }
  };

  useEffect(() => {
    const handleNav = (e) => {
      e.preventDefault();
      PATH.filter((path) =>
        router.pathname === "/"
          ? !path.route
          : path.route && path.route.slice(1) === router.pathname.slice(1)
      ).forEach(({ id }) => {
        const elId = id.slice(1);
        const el = router.pathname === "/" ? elId : router.pathname.slice(1);
        const isTopEl =
          router.pathname === "/" ? id === PATH[0].id : elId === el;
        var article = document.getElementById(el);
        var rect = article.getBoundingClientRect();
        const articleColor = window.getComputedStyle(article).backgroundColor;
        isTopEl
          ? rect.top < 0 && rect.bottom >= 49
            ? handleColor({
                articleColor:
                  router.pathname === "/" ? "rgb(19, 20, 22)" : articleColor,
              })
            : rect.top === 0 &&
              handleColor({
                articleColor: "rgba(0, 0, 0, 0)",
              })
          : rect.top <= 49 &&
            rect.bottom >= 49 &&
            handleColor({ articleColor });
        rect.top <= 49 && rect.bottom >= 49 && hash !== id && setHash(id);
      });
    };

    let actionBtn = btn.current;
    window.addEventListener("scroll", handleNav);
    isMobileResolution &&
      actionBtn &&
      actionBtn.addEventListener("click", handleMenu);

    return () => {
      window.removeEventListener("scroll", handleNav);
      isMobileResolution &&
        actionBtn &&
        actionBtn.removeEventListener("click", handleMenu);
    };
  }, [
    btn,
    nav,
    container,
    isMobileResolution,
    open,
    hash,
    router,
    handleMenu,
    handleColor,
  ]);

  // Reset hash
  useEffect(() => {
    router.pathname === "/" && setHash(PATH[0].id);
  }, [router.pathname]);

  // Reset open
  useEffect(() => {
    !isMobileResolution && open && handleMenu();
  }, [isMobileResolution, open, handleMenu]);

  const handleRoute = (path) => {
    router.push(path);
    open && handleMenu();
  };

  return {
    PATH,
    open,
    hash,
    isMobileResolution,
    nav,
    btn,
    container,
    router,
    handleMenu,
    handleRoute,
  };
}
