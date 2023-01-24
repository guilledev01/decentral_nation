import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { Logo } from "../../elements";

export default function Footer() {
  const { t } = useTranslation("common");
  const path = t("path", {}, { returnObjects: true });

  return (
    <footer className="d-flex col ai-c jc-c gp-32">
      <Logo />
      <div className="d-flex flex-wrap ai-c jc-se gp-16 pl-32 pr-32">
        {path
          .filter((path) => path.route)
          .map(({ title, route }, id) => {
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
