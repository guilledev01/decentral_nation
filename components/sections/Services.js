import Image from "next/image";
import Audits from "../../assets/imgs/audits.avif";
import Consulting from "../../assets/imgs/consulting.avif";
import Dapps from "../../assets/imgs/dapps.avif";
import Promotion from "../../assets/imgs/promotion.avif";
import Storage from "../../assets/imgs/storage.avif";
import { FadeEffect } from "../animations";

const SERVICES = {
  introduction:
    "We offer a comprehensive range of services to help you create and launch your decentralized application. These include:",
  service: [
    {
      image: Dapps,
      title: "Decentralized Application Development",
      text: "Our team of experts can help you create a fully functional decentralized application, including the frontend, backend, and blockchain components. We have experience with a variety of blockchain platforms, including Ethereum, Polygon, BSC and others, and can help you choose the right platform for your project.",
    },
    {
      image: Audits,
      title: "Smart Contract Audits",
      text: "We offer thorough audits of your smart contracts, which include a detailed report of any potential vulnerabilities or issues. Our audits also include a certificate of completion, which demonstrates the security and reliability of your smart contract.",
    },
    {
      image: Storage,
      title: "Decentralized Storage",
      text: "We can help you set up a decentralized database to keep track of the transactions and accounting of your smart contract. This ensures that all data is transparent, tamper-proof, and accessible to all parties involved.",
    },
    {
      image: Consulting,
      title: "Technology Consulting",
      text: "We offer technology consulting for tokenization and blockchain projects. This includes advice on token economics, smart contract development. We can help you navigate the complex world of blockchain technology and make informed decisions for your project.",
    },
    {
      image: Promotion,
      title: "Promotion Service",
      text: "By choosing to work with us, you can take advantage of our platform to reach a wider audience and showcase your project to potential users and investors. We believe that the success of your project is our success as well, so we offer a complimentary promotion service for projects that we work on. This includes featuring your project on our website, as well as promoting it through our social media channels and network of contacts. Our goal is to help you launch your decentralized application and make it a success.",
    },
  ],
};

export default function Services() {
  return (
    <article id="services">
      <div className="d-flex col ai-c jc-c gp-64">
        <div className="d-flex col ai-c jc-c gp-32">
          <h3>Our services</h3>
          <span>{SERVICES.introduction}</span>
        </div>
        <div className="d-flex col gp-64">
          {SERVICES.service.map(({ image, title, text }, id) => {
            return (
              <FadeEffect
                key={id}
                left={id % 2 === 0}
                right={id % 2 === 1}
                distance="60px"
                delay={parseInt(`${id + 1 * 3}00`)}
              >
                <div
                  className={`d-flex flex-wrap ai-c jc-se gp-64 p-15 ${
                    id % 2 === 0 ? "row" : "row-rev"
                  }`}
                >
                  <div style={{ maxWidth: 400 }} className="d-flex jc-c">
                    <Image className="service-image" src={image} alt={title} />
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
