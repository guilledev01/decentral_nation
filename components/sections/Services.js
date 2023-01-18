import Image from "next/image";
import Service1 from "../../assets/imgs/service-1.avif";
import Service2 from "../../assets/imgs/service-2.avif";
import Service4 from "../../assets/imgs/service-4.avif";
import Service5 from "../../assets/imgs/service-5.avif";
import Service6 from "../../assets/imgs/service-6.avif";
import { FadeEffect } from "../animations";

const SERVICES = {
  introduction:
    "We offer a comprehensive range of services to help you create and launch your decentralized application. These include:",
  service: [
    {
      image: Service5,
      title: "Decentralized application development",
      text: "Our team of experts can help you create a fully functional decentralized application, including the frontend, backend, and blockchain components. We have experience with a variety of blockchain platforms, including Ethereum, EOS, and others, and can help you choose the right platform for your project.",
    },
    {
      image: Service4,
      title: "Smart contract audits",
      text: "We offer thorough audits of your smart contracts, which include a detailed report of any potential vulnerabilities or issues. Our audits also include a certificate of completion, which demonstrates the security and reliability of your smart contract.",
    },
    {
      image: Service6,
      title: " Decentralized storage",
      text: "We can help you set up a decentralized database to keep track of the transactions and accounting of your smart contract. This ensures that all data is transparent, tamper-proof, and accessible to all parties involved.",
    },
    {
      image: Service2,
      title: "Technology consulting",
      text: "We offer technology consulting for tokenization and blockchain projects. This includes advice on token economics, smart contract development. We can help you navigate the complex world of blockchain technology and make informed decisions for your project.",
    },
    {
      image: Service1,
      title: "Promotion service",
      text: "By choosing to work with us, you can take advantage of our platform to reach a wider audience and showcase your project to potential users and investors. We believe that the success of your project is our success as well, so we offer a complimentary promotion service for projects that we work on. This includes featuring your project on our website, as well as promoting it through our social media channels and network of contacts. Our goal is to help you launch your decentralized application and make it a success.",
    },
  ],
};

export default function Services() {
  return (
    <article id="services">
      <div className="d-flex col ai-c jc-c gp-64">
        <div className="d-flex col ai-c jc-c gp-32">
          <h3>Services</h3>
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
                delay={parseInt(`${id + 1 * 5}00`)}
              >
                <div
                  style={{ minHeight: 300 }}
                  className={`d-flex flex-wrap jc-sa gp-32 ${
                    id % 2 === 0 ? "row" : "row-rev"
                  }`}
                >
                  <div style={{ maxHeight: 300 }} className="d-flex jc-c">
                    <Image className="service-image" src={image} alt={title} />
                  </div>
                  <div
                    style={{ maxWidth: 800 }}
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
