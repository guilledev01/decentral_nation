import { useEffect, useRef, useState } from "react";

export default function Button({ color, titleA, titleB, ...props }) {
  const btn = useRef();
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(titleA);
    if (titleB && btn.current) {
      btn.current.addEventListener("mouseenter", () => setTitle(titleB));
      btn.current.addEventListener("mouseleave", () => setTitle(titleA));
    }

    return () => {
      if (titleB && btn.current) {
        btn.current.removeEventListener("mouseenter", () => setTitle(titleB));
        btn.current.removeEventListener("mouseleave", () => setTitle(titleA));
      }
    };
  }, [btn, titleA, titleB]);

  return (
    <button ref={btn} {...props} className={`btn ${color} d-flex ai-c jc-c`}>
      <h4>{title}</h4>
    </button>
  );
}
