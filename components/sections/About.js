import { FadeEffect, ZoomEffect } from "../animations";
import { ContractIcon, TaskIcon, UserInterfaceIcon } from "../svgs";

const ABOUT = {
  introduction:
    "We are a team of developers and entrepreneurs who are passionate about decentralization and the potential it has to change the world. We believe that decentralized applications can create a more secure and transparent digital world, and we are dedicated to helping others create and launch their own decentralized applications. At our company, we offer high-quality decentralized application (DAPP) development services. Our developers are experts in blockchain technology and are committed to providing innovative and scalable solutions to our clients. Our working methodology is based on continuous communication and close collaboration with our clients to ensure projects are completed on time and within budget.",
  team: [
    {
      icon: <TaskIcon />,
      title: "Project Manager",
      text: "The project manager is responsible for overseeing the development process and ensuring that the project is completed on time and within budget. This includes managing the team, setting project milestones, and communicating with stakeholders.",
    },
    {
      icon: <ContractIcon />,
      title: "Blockchain Developer",
      text: "A blockchain developer is a specialized developer who is responsible for the development and implementation of smart contracts on the blockchain. This includes creating and testing the smart contracts, as well as interacting with the blockchain network to deploy and execute the contracts. They also may be responsible for creating and maintaining the infrastructure necessary for the blockchain network to function properly.",
    },
    {
      icon: <UserInterfaceIcon />,
      title: "Full Stack Developer",
      text: "A full stack developer in a DAPP project is responsible for the development and maintenance of both the front-end and back-end of the application. This includes the design and implementation of the user interface, as well as the integration of the smart contracts on the blockchain.",
    },
  ],
  conclusion:
    "All of these roles are important to ensure a successful and high-quality DAPP development process.",
};

export default function About({ isMobileResolution }) {
  return (
    <article id="team">
      <div className="d-flex col ai-c jc-c gp-64">
        <FadeEffect bottom distance="60px">
          <div className="d-flex col ai-c jc-c gp-32">
            <h3>About Us</h3>
            <span>{ABOUT.introduction}</span>
          </div>
        </FadeEffect>
        <FadeEffect bottom distance="60px" delay={600}>
          <div className="d-flex col ai-c jc-c gp-64">
            <h4>Team</h4>
            <div className="d-flex flex-wrap jc-se gp-64">
              {ABOUT.team.map(({ title, icon, text }, id) => {
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
                        <div className="rombo2 d-flex ai-c jc-c">{icon}</div>
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
          <span>{ABOUT.conclusion}</span>
        </FadeEffect>
      </div>
    </article>
  );
}
