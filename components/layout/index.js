import { ReCaptchaProvider } from "next-recaptcha-v3";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "react-tsparticles";
import { useLayout } from "../../hooks";
import { ParticleConfig } from "../../utils/particles";
import { Loader } from "../elements";
import { Cookies } from "../sections";
import Footer from "./Footer";
import Header from "./Header";

export default function GlobalLayout({ children }) {
  const { load, particlesInit, particlesLoaded, router, font, title } =
    useLayout();
  return (
    <div className={font.className}>
      <Head>
        <title>Decentral Nation | {title}</title>
      </Head>
      <ReCaptchaProvider
        reCaptchaKey="6LcksxIkAAAAAIF5VJcHKyEO5yXyoZzYN_GQfcWD"
        useEnterprise
      >
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
        {load ? (
          <>
            <Header />
            <main>{children}</main>
            {router.pathname === "/" && <Footer />}
            <Cookies />
          </>
        ) : (
          <Loader />
        )}
      </ReCaptchaProvider>
    </div>
  );
}
