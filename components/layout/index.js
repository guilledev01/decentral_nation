import { useEffect } from "react";
import { Chivo } from "@next/font/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHasNewDeploy } from "next-deploy-notifications";
import { useStorage } from "../../hooks";
import { GlobalContext } from "../../utils/context";
import Header from "./Header";
import Footer from "./Footer";

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
        1000
      );
    }

    return () => clearTimeout(timer);
  }, [hasNewDeploy]);

  return (
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
      <Context>
        <Header />
        <main>{children}</main>
        <Footer />
      </Context>
    </div>
  );
}
