import { Kanit } from "@next/font/google";
import { useHasNewDeploy } from "next-deploy-notifications";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useStorage } from "../../hooks";
import { GlobalContext } from "../../utils/context";
import { ParticleConfig } from "../../utils/particles";
import { Loader } from "../elements";
import Footer from "./Footer";
import Header from "./Header";

const font = Kanit({
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
        {load ? (
          <>
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        ) : (
          <Loader />
        )}
      </Context>
    </div>
  );
}
