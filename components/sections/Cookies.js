import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect, useState } from "react";
import { ZoomEffect } from "../animations";

export default function Cookies() {
  const [request, setRequest] = useState(false);
  const [cookies, setCookies] = useState(false);
  const [show, setShow] = useState(false);
  const { t, lang } = useTranslation("common");
  const cookie = t("cookies", {}, { returnObjects: true });

  const handleCookies = (permission) => {
    window.localStorage.setItem("cookies", permission);
    setRequest(false);
    setCookies(permission);
  };

  useEffect(() => {
    const item = window.localStorage.getItem("cookies");
    if (item === null) {
      setShow(true);
      setRequest(true);
    } else {
      setCookies(item);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (!request) {
      timer = setTimeout(() => setShow(false), 500);
    }
    return () => clearTimeout(timer);
  }, [request]);

  return (
    <>
      {cookies === "accepted" && <GoogleAnalytics trackPageViews />}
      {show && (
        <ZoomEffect duration={200} distance="60px" when={request}>
          <div className="cookies d-flex col jc-c pl-32 pr-32 pt-64 pb-64 gp-16">
            <div>
              <span>{cookie.text}</span>
              &nbsp;
              <Link className="routes" href="cookies-policy">
                {cookie.policy.cookie}
              </Link>
              &nbsp;
              <span>{cookie.and}</span>
              &nbsp;
              <Link className="routes" href="cookies-policy">
                {cookie.policy.privacy}
              </Link>
              &nbsp;
            </div>
            <div className="cookie-btn d-flex ai-c jc-c gp-32 m-16">
              <button onClick={() => handleCookies("declined")}>
                <span>{cookie.decline}</span>
              </button>
              <button onClick={() => handleCookies("accepted")}>
                <span>{cookie.accept}</span>
              </button>
            </div>
          </div>
        </ZoomEffect>
      )}
    </>
  );
}
