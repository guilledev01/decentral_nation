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

export default function useLayout() {
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState("Loading");
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
  }, [router]);

  return { load, particlesInit, particlesLoaded, router, font, title };
}
