import useTranslation from "next-translate/useTranslation";
import { FadeEffect, ZoomEffect } from "../animations";
import { BlockchainIcon, DatabaseIcon, IpfsIcon, NodeIcon } from "../svgs";

const ICON = {
  blockchain: [
    {
      icon: <BlockchainIcon />,
    },
    {
      icon: <BlockchainIcon />,
    },
    {
      icon: <BlockchainIcon />,
    },
  ],
  ipfs: [
    {
      icon: <IpfsIcon />,
    },
    {
      icon: <DatabaseIcon />,
    },
    {
      icon: <NodeIcon />,
    },
  ],
};

export default function Decentralization({ isMobileResolution }) {
  const { t } = useTranslation("home");
  const decentralization = t("decentralization", {}, { returnObjects: true });

  return (
    <article id="decentralization">
      <div className="d-flex col ai-c jc-c gp-64">
        <FadeEffect bottom distance="60px">
          <div className="d-flex col ai-c jc-c gp-32">
            <h3>{decentralization.header}</h3>
            <span>{decentralization.introduction}</span>
          </div>
        </FadeEffect>
        <FadeEffect bottom distance="60px" delay={400}>
          <div className="d-flex col ai-c jc-c gp-64">
            <h4>Blockchain</h4>
            <div className="d-flex flex-wrap jc-se gp-64">
              {decentralization.blockchain.map(({ text }, id) => {
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
                          {ICON.blockchain[id].icon}
                        </div>
                      </div>

                      <span>{text}</span>
                    </div>
                  </ZoomEffect>
                );
              })}
            </div>
          </div>
        </FadeEffect>
        <FadeEffect bottom distance="60px" delay={600}>
          <div className="d-flex col ai-c jc-c gp-64">
            <h4>IPFS</h4>
            <div className="d-flex flex-wrap jc-se gp-64">
              {decentralization.ipfs.map(({ text }, id) => {
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
                          {ICON.ipfs[id].icon}
                        </div>
                      </div>

                      <span>{text}</span>
                    </div>
                  </ZoomEffect>
                );
              })}
            </div>
          </div>
        </FadeEffect>
        <FadeEffect bottom distance="60px" delay={800}>
          <div className="d-flex col ai-c jc-c gp-32">
            <h4>Both</h4>

            <span>{decentralization.conclusion}</span>
          </div>
        </FadeEffect>
      </div>
    </article>
  );
}
