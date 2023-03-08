import dynamic from "next/dynamic";

const About = dynamic(() => import("./About"), {
  loading: () => <></>,
  ssr: true,
});
const ChatWidget = dynamic(() => import("./chatWidget"), {
  loading: () => <></>,
  ssr: true,
});
const Cookies = dynamic(() => import("./Cookies"), {
  loading: () => <></>,
  ssr: true,
});
const Decentralization = dynamic(() => import("./Decentralization"), {
  loading: () => <></>,
  ssr: true,
});
const LangWidget = dynamic(() => import("./LangWidget"), {
  loading: () => <></>,
  ssr: true,
});
const Projects = dynamic(() => import("./Projects"), {
  loading: () => <></>,
  ssr: true,
});
const Services = dynamic(() => import("./Services"), {
  loading: () => <></>,
  ssr: true,
});

export {
  About,
  ChatWidget,
  Cookies,
  Decentralization,
  LangWidget,
  Projects,
  Services,
};
