import Link from "next/link";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect, useState } from "react";
import { ZoomEffect } from "../animations";

export default function Cookies() {
  const [request, setRequest] = useState(false);
  const [cookies, setCookies] = useState(false);

  const handleCookies = (permission) => {
    window.localStorage.setItem("cookies", permission);
    setRequest(false);
    setCookies(permission);
  };

  useEffect(() => {
    const item = window.localStorage.getItem("cookies");
    item === null ? setRequest(true) : setCookies(item);
  }, []);

  return (
    <>
      {cookies === "accepted" && <GoogleAnalytics trackPageViews />}
      <ZoomEffect duration={500} distance="60px" when={request}>
        <div className="cookies d-flex col jc-c p-32 gp-16">
          <div>
            <span>
              Our website uses cookies to enhance your browsing experience and
              provide you with personalized content. By clicking 'Accept', you
              consent to the use of cookies. If you choose to 'Decline', some
              features of the website may be limited. For more information on
              our cookie policy, please visit our
            </span>
            &nbsp;
            <Link className="routes" href="cookies-policy">
              Cookies Policy
            </Link>
            &nbsp;
            <span>and</span>
            &nbsp;
            <Link className="routes" href="cookies-policy">
              Privacy Policy
            </Link>
            &nbsp;
            <span>pages</span>
          </div>
          <div className="cookie-btn d-flex ai-c jc-c gp-32">
            <button onClick={() => handleCookies("declined")}>
              <span>Decline</span>
            </button>
            <button onClick={() => handleCookies("accepted")}>
              <span>Accept</span>
            </button>
          </div>
        </div>
      </ZoomEffect>
    </>
  );
}
