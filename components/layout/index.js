import { ReCaptchaProvider } from "next-recaptcha-v3";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "react-tsparticles";
import { useLayout } from "../../hooks";
import { ParticleConfig } from "../../utils/particles";
import { Loader } from "../elements";
import { ChatWidget, Cookies, LangWidget } from "../sections";
import Footer from "./Footer";
import Header from "./Header";

export default function GlobalLayout({ children }) {
  const {
    load,
    particlesInit,
    particlesLoaded,
    router,
    font,
    title,
    description,
  } = useLayout();

  return (
    <>
      <Head>
        <title>
          {title ? `Decentral Nation | ${title}` : "Decentral Nation | Welcome"}
          <meta name="description" content={description} />
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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
        <ReCaptchaProvider>
          {load ? (
            <>
              <Header />
              <main>{children}</main>
              {router.pathname === "/" && <Footer />}
              <Cookies />
              <LangWidget router={router} />
              <ChatWidget router={router} />
            </>
          ) : (
            <Loader />
          )}
        </ReCaptchaProvider>
      </div>
    </>
  );
}
