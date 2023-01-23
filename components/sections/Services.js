import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Audits from "../../assets/imgs/audits.avif";
import Consulting from "../../assets/imgs/consulting.avif";
import Dapps from "../../assets/imgs/dapps.avif";
import Promotion from "../../assets/imgs/promotion.avif";
import Storage from "../../assets/imgs/storage.avif";
import { FadeEffect } from "../animations";

const IMAGE = [
  { img: Dapps },
  { img: Audits },
  { img: Storage },
  { img: Consulting },
  { img: Promotion },
];

export default function Services() {
  const { t } = useTranslation("home");
  const services = t("services", {}, { returnObjects: true });

  return (
    <article id="services">
      <div className="d-flex col ai-c jc-c gp-64">
        <div className="d-flex col ai-c jc-c gp-32">
          <h3>{services.header}</h3>
          <span>{services.introduction}</span>
        </div>
        <div className="d-flex col gp-64">
          {services.service.map(({ title, text }, id) => {
            return (
              <FadeEffect
                key={id}
                left={id % 2 === 0}
                right={id % 2 === 1}
                distance="60px"
                delay={parseInt(`${id + 1 * 2}00`)}
              >
                <div
                  className={`d-flex flex-wrap ai-c jc-se gp-64 p-15 ${
                    id % 2 === 0 ? "row" : "row-rev"
                  }`}
                >
                  <div style={{ maxWidth: 400 }} className="d-flex jc-c">
                    <Image
                      className="service-image"
                      src={IMAGE[id].img}
                      alt={title}
                    />
                  </div>
                  <div
                    style={{ maxWidth: 1000 }}
                    className="d-flex col jc-c gp-16"
                  >
                    <h4>{title}</h4>
                    <span>{text}</span>
                  </div>
                </div>
              </FadeEffect>
            );
          })}
        </div>
      </div>
    </article>
  );
}
