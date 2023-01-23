import { useEffect, useRef } from "react";

export default function Dropdown({ button, children }) {
  const btnRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    let btn = btnRef.current;
    let menu = menuRef.current;

    const toggleDropdown = (e) => {
      e.preventDefault();
      menu.classList.toggle("show");
    };

    btn.addEventListener("click", toggleDropdown);

    return () => btn.removeEventListener("click", toggleDropdown);
  }, [btnRef, menuRef]);
  return (
    <>
      <div className="dropdown-menu" ref={menuRef}>
        {children}
      </div>
      <div ref={btnRef}>{button}</div>
    </>
  );
}
