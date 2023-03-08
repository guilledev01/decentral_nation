import ScrollTrigger from "gsap/dist/ScrollTrigger";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProjectImage from "../../assets/imgs/project_01.avif";
import { openUrl } from "../../utils/base";
import { FadeEffect } from "../animations";

const PROJECTS = ["planetarylottery.app/", ""];

let gsap;

export default function Projects() {
  const { t } = useTranslation("home");
  const projects = t("projects", {}, { returnObjects: true });
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const loadGsap = async () => {
      gsap = (await import("gsap")).gsap;
      gsap.registerPlugin(ScrollTrigger);
    };
    loadGsap();
  }, []);

  useEffect(() => {
    const sWrapper = document.querySelector(".slider-wrapper");
    const sItem = document.querySelectorAll(".slide");
    const sWidth = sItem[0].offsetWidth;
    const sCount = sItem.length;
    const sTotalWidth = sCount * sWidth + 280;
    sWrapper.style.width = `${sTotalWidth}px`;

    const actualSlider = document.getElementById(0);
    actualSlider.classList.add("show");
  }, []);

  useEffect(() => {
    const sWrapper = document.querySelector(".slider-wrapper");
    const slide_date = document.querySelectorAll(".slide-date");
    const slide_title = document.querySelectorAll(".slide-title");
    const slide_divider = document.querySelectorAll(".slide-divider");
    const slide_text = document.querySelectorAll(".slide-text");
    const slide_more = document.querySelectorAll(".slide-more");
    const slide_image = document.querySelectorAll(".slide-image img");
    const sItem = document.querySelectorAll(".slide");
    const sWidth = sItem[0].offsetWidth;
    const duration = 0.3;

    if (gsap) {
      gsap.to(sWrapper, {
        duration,
        x: `-${sWidth * slide}px`,
      });

      const fromProperties = { autoAlpha: 0, y: "-40" };
      const toProperties = { duration, autoAlpha: 1, y: "0" };

      gsap.fromTo(
        slide_image[slide],
        {
          autoAlpha: 0,
          y: "40",
        },
        {
          duration,
          autoAlpha: 1,
          y: "0",
        }
      );
      gsap.fromTo(slide_date[slide], fromProperties, toProperties);
      gsap.fromTo(slide_title[slide], fromProperties, toProperties);
      gsap.fromTo(slide_divider[slide], fromProperties, toProperties);
      gsap.fromTo(slide_text[slide], fromProperties, toProperties);
      gsap.fromTo(slide_more[slide], fromProperties, toProperties);
    }
  }, [slide, gsap]);

  return (
    <article id="projects">
      <div className="d-flex col ai-c jc-c gp-64">
        <FadeEffect top distance="60px">
          <div className="d-flex col ai-c jc-c gp-32">
            <h3>{projects.header}</h3>
            <span>{projects.introduction}</span>
          </div>
        </FadeEffect>
      </div>
      <div className="d-flex col ai-fs gp-64 pt-64">
        <div className="slider-wrapper d-flex jc-c ai-c">
          <FadeEffect bottom distance="60px">
            <div className="slide d-flex col jc-c ai-c">
              <div
                className={`slide-image ${slide === 0 && "show"}`}
                // onClick={() => (slide !== id ? setSlide(id) : null)}
                role="button"
              >
                <Image
                  style={{ objectFit: "cover" }}
                  src={ProjectImage}
                  width={320}
                  height={320}
                  alt=""
                />
              </div>

              <div
                className={`slide-content d-flex col jc-c gp-16 p-16 ${
                  slide === 0 && "show"
                }`}
                id={0}
              >
                <div className="d-flex ai-c jc-sb">
                  <h5 className="slide-date">{`0${0 + 1}-02-23`}</h5>
                  <h5 className="slide-title"> {`Planetary Lottery`}</h5>
                </div>
                <div className="slide-divider divider"></div>
                <span className="slide-text">
                  Decentralized lottery on polygon network with chainlink
                  services
                </span>
                <div
                  className="slide-more"
                  onClick={() => openUrl("planetarylottery.app/")}
                >
                  Visit Project
                </div>
              </div>
            </div>
          </FadeEffect>

          <div
            className="reset-slider p-32 d-flex ai-c jc-c"
            onClick={() => setSlide(0)}
          >
            Back
          </div>
        </div>
      </div>
    </article>
  );
}
