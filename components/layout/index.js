import { Kanit } from "@next/font/google";
import config from "@successtar/react-reveal/globals";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLayout } from "../../hooks";
import { ChatWidget, Cookies, LangWidget } from "../sections";

const Header = dynamic(() => import("./Header"), {
  loading: () => <></>,
  ssr: true,
});

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <></>,
  ssr: true,
});

const font = Kanit({
  weight: "400",
  subsets: ["latin"],
});

config({ ssrFadeout: true });

export default function GlobalLayout({ children }) {
  const { router, title, description } = useLayout();

  return (
    <>
      <Head>
        <title>
          {title ? `Decentral Nation | ${title}` : "Decentral Nation | Welcome"}
        </title>
        <meta
          name="description"
          content={
            description
              ? description
              : "Welcome to Decentral Nation, where we decentralize your business and ensure its future. Request a quote for your project today and let's build the future together!"
          }
          key="desc"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={font.className}>
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
          <Header />
          <main>{children}</main>
          {router.pathname === "/" && <Footer />}
          <Cookies />
          <LangWidget router={router} />
          <ChatWidget router={router} />
        </ReCaptchaProvider>
      </div>
    </>
  );
}
