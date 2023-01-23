import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import i18nConfig from "../../i18n.json";
import { Dropdown } from "../elements";
import { CAIcon, EEUUIcon, ESIcon } from "../svgs";
const { locales } = i18nConfig;

const ICON = {
  en: <EEUUIcon />,
  es: <ESIcon />,
  ca: <CAIcon />,
};

export default function LangWidget() {
  const { t, lang } = useTranslation("common");
  const language = t("language", {}, { returnObjects: true });

  useEffect(() => {
    const isAvailable = locales.find(
      (item) => item === window.navigator.language.slice(0, 2)
    );

    const detectUserLanguage = async () => {
      await setLanguage(isAvailable);
    };

    if (isAvailable && lang !== isAvailable) {
      detectUserLanguage();
    }
  }, [lang]);

  return (
    <div className="lang-widget">
      <Dropdown
        button={
          <div className="lang-btn active max-width d-flex ai-c jc-fs p-16 gp-8">
            <div className="d-flex ai-c jc-c">{ICON[lang]}</div>
            <span className="d-flex ai-c jc-c">{language[lang]}</span>
          </div>
        }
      >
        <div className="d-flex col ai-c jc-c">
          {locales.map((lng) => {
            if (lng === lang) return null;
            return (
              <button
                className="lang-btn max-width d-flex ai-c jc-fs p-16 gp-8"
                key={lng}
                onClick={async () => await setLanguage(lng)}
              >
                <div className="d-flex ai-c jc-c">{ICON[lng]}</div>
                <span>{language[lng]}</span>
              </button>
            );
          })}
        </div>
      </Dropdown>
    </div>
  );
}
