import Link from "next/link";
import { Logo } from "../../elements";

const ROUTES = [
  { title: "Conatact", route: "/contact" },
  { title: "Privacy Policy", route: "/privacy-policy" },
  { title: "Legal Warning", route: "/legal-warning" },
  { title: "Cookies Policy", route: "/cookies-policy" },
];

export default function Footer() {
  return (
    <footer className="d-flex col ai-c jc-c gp-32">
      <Logo />
      <div className="d-flex ai-c jc-c gp-16">
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
