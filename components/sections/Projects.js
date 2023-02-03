import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { FadeEffect } from "../animations";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = ["", "", "", "", "", "", "", "", ""];

export default function Projects() {
  const { t } = useTranslation("home");
  const projects = t("projects", {}, { returnObjects: true });
  const [slide, setSlide] = useState(0);
  const items = PROJECTS.length - 1;

  const animateSlider = (e) => {
    const sWrapper = document.querySelector(".slider-wrapper");
    const slide_date = document.querySelectorAll(".slide-date");
    const slide_title = document.querySelectorAll(".slide-title");
    const slide_text = document.querySelectorAll(".slide-text");
    const slide_more = document.querySelectorAll(".slide-more");
    const slide_image = document.querySelectorAll(".slide-image img");
    const sItem = document.querySelectorAll(".slide");
    const sWidth = sItem[0].offsetWidth;

    gsap.to(sWrapper, {
      duration: 0.4,
      x: `-${sWidth * slide}px`,
    });

    const fromProperties = { autoAlpha: 0, y: "-40" };
    const toProperties = { autoAlpha: 1, y: "0" };
    const duration = 0.6;

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
    gsap.fromTo(
      slide_date[slide],
      {
        ...fromProperties,
      },
      { duration, ...toProperties }
    );
    gsap.fromTo(
      slide_title[slide],
      {
        ...fromProperties,
      },
      { duration, ...toProperties }
    );
    gsap.fromTo(
      slide_text[slide],
      {
        ...fromProperties,
      },
      { duration, ...toProperties }
    );
    gsap.fromTo(
      slide_more[slide],
      {
        ...fromProperties,
      },
      { duration, ...toProperties }
    );
  };

  useEffect(() => {
    const sWrapper = document.querySelector(".slider-wrapper");
    const sItem = document.querySelectorAll(".slide");
    const sWidth = sItem[0].offsetWidth;
    const sCount = sItem.length;
    const sTotalWidth = sCount * sWidth;
    sWrapper.style.width = `${sTotalWidth}px`;

    const actualSlider = document.getElementById(0);
    actualSlider.classList.add("show");
  }, []);

  useEffect(() => {
    animateSlider();
  }, [slide]);

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
      <div className="d-flex col ai-fs jc-c gp-64 pt-64">
        <div className="slider-wrapper d-flex jc-c ai-c">
          {PROJECTS.map((item, id) => {
            return (
              <div key={id} className="slide d-flex col jc-c ai-c">
                <div
                  className={`slide-image ${slide === id && "show"}`}
                  onClick={() => (slide !== id ? setSlide(id) : null)}
                  role="button"
                >
                  <img src="https://goranvrban.com/codepen/img2.jpg" />
                </div>

                <div
                  className={`slide-content d-flex col ai-c jc-c gp-32 p-32 ${
                    slide === id && "show"
                  }`}
                  id={id}
                >
                  <div className="d-flex col ai-c jc-c gp-8">
                    <h5 className="slide-date">{`${id + 1}-02-23`}</h5>
                    <h4 className="slide-title">LOREM IPSUM DOLOR SITE MATE</h4>
                  </div>
                  <div className="d-flex col ai-c jc-c gp-8">
                    <span className="slide-text">
                      Lorem ipsum dolor sit amet, ad est abhorreant efficiantur,
                    </span>
                    <button className="slide-more">READ MORE</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
