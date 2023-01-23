import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import { useCallback, useEffect, useRef, useState } from "react";
import i18nConfig from "../../i18n.json";
import { FadeEffect } from "../animations";
import { CAIcon, EEUUIcon, ESIcon } from "../svgs";
const { locales } = i18nConfig;

const ICON = {
  en: <EEUUIcon />,
  es: <ESIcon />,
  ca: <CAIcon />,
};

export default function LangWidget() {
  const [open, setOpen] = useState(false);
  const { t, lang } = useTranslation("common");
  const language = t("language", {}, { returnObjects: true });

  const btnRef = useRef();
  const menuRef = useRef();

  const toggleDropdown = useCallback(
    async ({ lng }) => {
      menuRef.current.classList.toggle("show");
      setOpen(!open);
      await setLanguage(lng);
    },
    [open, menuRef]
  );

  useEffect(() => {
    let btn = btnRef.current;
    btn.addEventListener("click", toggleDropdown);

    return () => btn.removeEventListener("click", toggleDropdown);
  }, [btnRef, toggleDropdown]);

  return (
    <div className="lang-widget">
      <div className="dropdown-menu" ref={menuRef}>
        <FadeEffect top when={open} cascade duration={200} distance="60px">
          <div className="d-flex col ai-c jc-c gp-8">
            {locales.map((lng) => {
              if (lng === lang) return null;
              return (
                <button
                  key={lng}
                  className="lang-btn max-width d-flex ai-c jc-fs p-16 gp-8"
                  onClick={() => toggleDropdown({ lng })}
                >
                  <div className="d-flex ai-c jc-c">{ICON[lng]}</div>
                  <span>{language[lng]}</span>
                </button>
              );
            })}
          </div>
        </FadeEffect>
      </div>
      <div ref={btnRef}>
        <div className="lang-btn active max-width d-flex ai-c jc-fs p-16 gp-8">
          <div className="d-flex ai-c jc-c">{ICON[lang]}</div>
          <span className="d-flex ai-c jc-c">{language[lang]}</span>
        </div>
      </div>
    </div>
  );
}
