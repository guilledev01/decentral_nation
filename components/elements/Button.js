import { useEffect, useRef, useState } from "react";

export default function Button({ color, titleA, titleB, ...props }) {
  const btn = useRef();
  const [title, setTitle] = useState("");

  useEffect(() => {
    let actionBtn = btn.current;
    setTitle(titleA);
    if (titleB && actionBtn) {
      actionBtn.addEventListener("mouseenter", () => setTitle(titleB));
      actionBtn.addEventListener("mouseleave", () => setTitle(titleA));
    }

    return () => {
      if (titleB && actionBtn) {
        actionBtn.removeEventListener("mouseenter", () => setTitle(titleB));
        actionBtn.removeEventListener("mouseleave", () => setTitle(titleA));
      }
    };
  }, [btn, titleA, titleB]);

  return (
    <button ref={btn} {...props} className={`btn ${color} d-flex ai-c jc-c`}>
      <h4>{title}</h4>
    </button>
  );
}
