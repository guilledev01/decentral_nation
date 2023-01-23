import useTranslation from "next-translate/useTranslation";
import { FadeEffect, ZoomEffect } from "../animations";
import { ContractIcon, TaskIcon, UserInterfaceIcon } from "../svgs";

const ICON = [
  { icon: <TaskIcon /> },
  { icon: <ContractIcon /> },
  { icon: <UserInterfaceIcon /> },
];

export default function About({ isMobileResolution }) {
  const { t } = useTranslation("home");
  const about = t("about", {}, { returnObjects: true });

  return (
    <article id="team">
      <div className="d-flex col ai-c jc-c gp-64">
        <FadeEffect bottom distance="60px">
          <div className="d-flex col ai-c jc-c gp-32">
            <h3>{about.header}</h3>
            <span>{about.introduction}</span>
          </div>
        </FadeEffect>
        <FadeEffect bottom distance="60px" delay={600}>
          <div className="d-flex col ai-c jc-c gp-64">
            <h4>Team</h4>
            <div className="d-flex flex-wrap jc-se gp-64">
              {about.team.map(({ title, text }, id) => {
                return (
                  <ZoomEffect
                    key={id}
                    bottom
                    delay={parseInt(`${id + 1 * 2}00`)}
                    duration={1500}
                  >
                    <div
                      key={id}
                      className="d-flex col ai-c jc-fs gp-32"
                      style={{
                        maxWidth: isMobileResolution ? "100%" : 500,
                      }}
                    >
                      <div className="rombo1 d-flex ai-c jc-c">
                        <div className="rombo2 d-flex ai-c jc-c">
                          {ICON[id].icon}
                        </div>
                      </div>
                      <h5>{title}</h5>
                      <span>{text}</span>
                    </div>
                  </ZoomEffect>
                );
              })}
            </div>
          </div>
        </FadeEffect>
        <FadeEffect bottom distance="60px" delay={800}>
          <span>{about.conclusion}</span>
        </FadeEffect>
      </div>
    </article>
  );
}
