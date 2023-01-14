"use client";

import { useEffect, useRef } from "react";
import { ZoomEffect } from "../animations";
import { CloseIcon } from "../svgs";

export default function Modal({
  open,
  setOpen,
  title,
  children,
  isMobileResolution = true,
}) {
  const modal = useRef();

  const openModal = () => {
    modal.current.classList.add("show");
  };

  const closeModal = () => {
    modal.current.classList.remove("show");
  };

  const modalListener = (e) => {
    e.stopPropagation();
    if (e.target === modal.current) {
      setOpen(false);
    }
  };

  const adjustDimension = () => {
    const modalContent = modal.current.children[0];
    if (isMobileResolution) {
      modalContent.style.width = "364px";
    } else {
      modalContent.style.width = "1200px";
    }
  };

  useEffect(() => {
    open ? openModal() : closeModal();
    window.addEventListener("mousedown", modalListener);
    return () => window.removeEventListener("mousedown", modalListener);
  }, [modal, open]);

  useEffect(() => {
    adjustDimension();
  }, [modal, isMobileResolution]);

  return (
    <div className="modal" ref={modal}>
      <ZoomEffect opposite when={open} duration={250}>
        <div className="modal-content d-flex col gp-32">
          <span className="d-flex ai-c jc-sb">
            <h4>{title}</h4>
            <div
              className="close-container d-flex ai-c jc-c p-8"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </div>
          </span>
          <div className="d-flex col gp-32">{children}</div>
        </div>
      </ZoomEffect>
    </div>
  );
}
