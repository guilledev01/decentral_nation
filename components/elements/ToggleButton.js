import { useRef, useEffect } from "react";

export default function ToggleButton({ toggle, setToggle, children }) {
  const btnGroup = useRef();

  const hoverElement = (e) => {
    e.stopImmediatePropagation();
    const isActualBtnActive = e.target.classList.contains("active");
    if (!isActualBtnActive) {
      e.type === "mouseenter" && btnGroup.current.classList.add("activating");
      e.type === "mouseleave" &&
        btnGroup.current.classList.remove("activating");

      btnGroup.current.childNodes.forEach((btn) => {
        const isBtnActive = btn.classList.contains("active");
        if (btn !== e.target && !isBtnActive) {
          e.type === "mouseenter" && btn.classList.add("activating");
          e.type === "mouseleave" && btn.classList.remove("activating");
        }
      });
    }
  };

  const clickElement = (e) => {
    e.stopImmediatePropagation();
    btnGroup.current.classList.remove("activating");
    btnGroup.current.childNodes.forEach((btn) => {
      const isActivating = btn.classList.contains("activating");
      isActivating && btn.classList.remove("activating");
    });
    setToggle(e.target.getAttribute("value"));
  };

  useEffect(() => {
    btnGroup.current &&
      btnGroup.current.childNodes.forEach((btn) => {
        const isActive = btn.classList.contains("active");
        if (!isActive) {
          btn.addEventListener("mouseenter", hoverElement);
          btn.addEventListener("mouseleave", hoverElement);
          btn.addEventListener("mousedown", clickElement);
        }
      });

    return () => {
      btnGroup.current &&
        btnGroup.current.childNodes.forEach((btn) => {
          btn.removeEventListener("mouseenter", hoverElement);
          btn.removeEventListener("mouseleave", hoverElement);
          btn.removeEventListener("mousedown", clickElement);
        });
    };
  }, [btnGroup, toggle]);

  return (
    <div
      className="btn-group d-flex ai-c jc-c max-width m-center"
      ref={btnGroup}
    >
      {children}
    </div>
  );
}
