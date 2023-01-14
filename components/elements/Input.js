import { useEffect, useState } from "react";
import ClipboardJS from "clipboard";

export default function Input({
  title,
  id,
  refData,
  iconA,
  iconB,
  titleColor,
}) {
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    let timer;

    const clipboard = new ClipboardJS(`.btn-${id}`);

    clipboard.on("success", function (e) {
      setCopy(true);
      timer = setTimeout(() => setCopy(false), 1000);

      e.clearSelection();
    });

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div className="max-width d-flex col ai-fs gp-4">
      <span style={{ color: titleColor ? titleColor : "" }}>{title}</span>
      <div className="form-group">
        <input
          readOnly
          id={id}
          className="form-field"
          type="text"
          value={refData}
        />
        <button className={`btn-${id}`} data-clipboard-target={`#${id}`}>
          {copy ? iconA : iconB}
        </button>
      </div>
    </div>
  );
}
