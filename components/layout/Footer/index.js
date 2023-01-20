import Link from "next/link";
import { Logo } from "../../elements";

const ROUTES = [
  { title: "Request Budget", route: "/request-budget" },
  { title: "Contact Us", route: "/contact-us" },
  { title: "Privacy Policy", route: "/privacy-policy" },
  { title: "Legal Warning", route: "/legal-warning" },
  { title: "Cookies Policy", route: "/cookies-policy" },
];

export default function Footer() {
  return (
    <footer className="d-flex col ai-c jc-c gp-32">
      <Logo />
      <div className="d-flex flex-wrap ai-c jc-se gp-16 pl-32 pr-32">
        {ROUTES.map(({ title, route }, id) => {
          return (
            <Link className="routes" key={id} href={route}>
              {title}
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
