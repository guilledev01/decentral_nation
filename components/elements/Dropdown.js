import { useEffect } from "react";

export default function Dropdown({ button, children }) {
  useEffect(() => {
    const dropdownBtnContainer = document.querySelector(
      ".dropdown-btn-container"
    );
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    const toggleDropdown = () => {
      dropdownMenu.classList.toggle("show");
    };

    const listenClickMenu = (e) => {
      e.stopImmediatePropagation();
      toggleDropdown();
    };

    const listenDropdownBtn = (e) => {
      e.stopImmediatePropagation();
      !dropdownMenu.classList.contains("show") && toggleDropdown();
    };

    const listenDropdownMenu = (e) => {
      e.stopImmediatePropagation();
      if (
        dropdownMenu.classList.contains("show") &&
        e.relatedTarget !== dropdownBtnContainer
      ) {
        toggleDropdown();
      }
    };

    const listenDropdownBtnContainer = (e) => {
      e.stopImmediatePropagation();
      try {
        const el = e.relatedTarget;
        const elParent = el.offsetParent;

        if (el === dropdownMenu || elParent === dropdownMenu) {
          dropdownMenu.classList.contains("show") &&
            dropdownMenu.addEventListener("mouseleave", listenDropdownMenu);
        }

        if (
          el !== dropdownMenu &&
          el.offsetParent !== dropdownMenu &&
          dropdownMenu.classList.contains("show")
        ) {
          toggleDropdown();
        }
      } catch (err) {
        console.error(err);
      }
    };

    dropdownMenu.addEventListener("click", listenClickMenu);
    dropdownBtnContainer.addEventListener(
      "mouseleave",
      listenDropdownBtnContainer
    );
    dropdownBtn.addEventListener("mouseenter", listenDropdownBtn);

    return () => {
      dropdownMenu.addEventListener("click", listenClickMenu);
      dropdownBtnContainer.removeEventListener(
        "mouseleave",
        listenDropdownBtnContainer
      );
      dropdownBtn.removeEventListener("mouseenter", listenDropdownBtn);
      dropdownMenu.removeEventListener("mouseleave", listenDropdownMenu);
    };
  }, []);

  return (
    <div>
      <div className="dropdown-btn-container">
        <div className="dropdown-btn">{button}</div>
      </div>
      <div className="dropdown-menu">{children}</div>
    </div>
  );
}
