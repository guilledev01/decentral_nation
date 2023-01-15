import { useState, useEffect, useCallback } from "react";
import { Chivo } from "@next/font/google";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHasNewDeploy } from "next-deploy-notifications";
import { useStorage } from "../../hooks";
import { GlobalContext } from "../../utils/context";
import Header from "./Header";
import Footer from "./Footer";
import { ParticleConfig } from "../../utils/particles";

const font = Chivo({
  weight: "400",
  subsets: ["latin"],
});

const Context = ({ children }) => {
  const { localStorage } = useStorage();

  return (
    <GlobalContext.Provider
      value={{
        localStorage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default function GlobalLayout({ children }) {
  const [load, setLoad] = useState(false);
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

  return (
    <div className={font.className}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={ParticleConfig}
      />
      <ToastContainer
        position="bottom-right"
        closeOnClick
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <Context>
        <Header />
        <main>{load && children}</main>
        <Footer />
      </Context>
    </div>
  );
}
