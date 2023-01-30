import { Kanit } from "@next/font/google";
import { useHasNewDeploy } from "next-deploy-notifications";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loadFull } from "tsparticles";

const font = Kanit({
  weight: "400",
  subsets: ["latin"],
});

const TITLE = {
  "/": "Welcome",
  "/request-budget": "Request Budget",
  "/contact-us": "Contact Us",
  "/privacy-policy": "Privacy Policy",
  "/legal-warning": "Legal Warning",
  "/cookies-policy": "Cookies Policy",
};

const DESCRIPTION = {
  "/": "Welcome to Decentral Nation, where we decentralize your business and ensure its future. Request a quote for your project today and let's build the future together!",
  "/request-budget":
    "Obtain a complimentary and non-binding budget estimate for your project.",
  "/contact-us":
    "Tell us how we can help you and our support team will contact you as soon as possible.",
  "/privacy-policy": "Read our Privacy Policy for Decentral Nation website",
  "/legal-warning": "Read our Legal Warning for Decentral Nation website",
  "/cookies-policy": "Read our Cookies Policy for Decentral Nation website",
};

export default function useLayout() {
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState(false);
  const [description, setDesription] = useState(false);
  let router = useRouter();

  let { hasNewDeploy } = useHasNewDeploy();

  const NewVersionMsg = () => (
    <div className="d-flex ai-c jc-c">
      <span>New update available! Updating...</span>
    </div>
  );

  useEffect(() => {
    let timer;
    if (hasNewDeploy) {
      toast.info(<NewVersionMsg />);
      timer = setTimeout(
        () => (window.location = window.location.href + "?eraseCache=true"),
        4000
      );
    }

    return () => clearTimeout(timer);
  }, [hasNewDeploy]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    setLoad(true);
  }, []);

  useEffect(() => {
    setTitle(TITLE[router.pathname]);
    setDesription(DESCRIPTION[router.pathname]);
  }, [router]);

  return {
    load,
    particlesInit,
    particlesLoaded,
    router,
    font,
    title,
    description,
  };
}
