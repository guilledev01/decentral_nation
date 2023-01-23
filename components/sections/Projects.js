import useTranslation from "next-translate/useTranslation";
import { FadeEffect } from "../animations";

export default function Projects() {
  const { t } = useTranslation("home");
  const projects = t("projects", {}, { returnObjects: true });

  return (
    <article id="projects">
      <div className="d-flex col ai-c jc-c gp-64">
        <FadeEffect bottom distance="60px">
          <div className="d-flex col ai-c jc-c gp-32">
            <h3>{projects.header}</h3>
            <span>{projects.introduction}</span>
          </div>
        </FadeEffect>
      </div>
    </article>
  );
}
