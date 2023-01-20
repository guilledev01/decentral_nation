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

export default function useLayout() {
  const [load, setLoad] = useState(false);
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

  return { load, particlesInit, particlesLoaded, router, font };
}
