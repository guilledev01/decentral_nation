import {
  BlockchainIcon,
  IpfsIcon,
  NetworkIcon,
  ShieldIcon,
  DatabaseIcon,
  NodeIcon,
} from "../svgs";

const DECENTRALIZATION = {
  introduction:
    "Decentralization is the process of distributing power and control away from centralized entities. In the digital world, this means creating systems and applications that are not controlled by a single entity, but rather by a network of users. This allows for a more secure and transparent system, as there is no single point of failure.",
  blockchain: [
    "One of the key elements of decentralization is the use of blockchain technology. A blockchain is a digital ledger that is used to record and verify transactions, create smart contracts, and more.",
    "We offer development on different blockchain platforms such as Ethereum, Polygon, BSC and many more. This allows you to choose the best platform for your project, based on your specific needs and requirements.",
    "By developing your decentralized application on a blockchain platform, you can be sure that your data will be safe, secure and easily accessible to all parties involved.",
  ],
  ipfs: [
    "We specialize in using IPFS (InterPlanetary File System) as part of our decentralized solutions. IPFS is a decentralized protocol that allows for the storage and retrieval of files on a distributed network.",
    "This is particularly useful for decentralized applications, as it allows for the storage of large amounts of data, such as media files, metadata for NFTs and create a decentralized database",
    "It allows faster data retrieval and lower latency due to peer to peer nodes. IPFS can provide a secure and efficient solution for your data.",
  ],
  conclusion:
    "By using IPFS in conjunction with blockchain technology, we can provide a truly decentralized solution that is both secure and efficient. This allows you to take advantage of the strengths of both technologies, and create a robust and reliable decentralized application.",
};
const BLOCKCHAIN_LOGO = [<BlockchainIcon />, <NetworkIcon />, <ShieldIcon />];
const IPFS_LOGO = [<IpfsIcon />, <DatabaseIcon />, <NodeIcon />];

export default function Decentralization({ isMobileResolution }) {
  return (
    <article id="decentralization">
      <div className="d-flex col ai-c jc-c gp-64">
        <div className="d-flex col ai-c jc-c gp-32">
          <h3>Decentralization</h3>
          <span>{DECENTRALIZATION.introduction}</span>
        </div>

        <div className="d-flex col ai-c jc-c gp-64">
          <h4>Blockchain</h4>
          <div className="d-flex flex-wrap ai-c jc-se gp-64">
            {DECENTRALIZATION.blockchain.map((text, id) => {
              return (
                <div
                  key={id}
                  className="d-flex col ai-c jc-fs gp-32"
                  style={{
                    width: isMobileResolution ? 350 : 500,
                    minHeight: 200,
                  }}
                >
                  <div className="rombo1 d-flex ai-c jc-c">
                    <div className="rombo2 d-flex ai-c jc-c">
                      {BLOCKCHAIN_LOGO[id]}
                    </div>
                  </div>
                  <span>{text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="d-flex col ai-c jc-c gp-64">
          <h4>IPFS</h4>
          <div className="d-flex flex-wrap ai-c jc-se gp-64">
            {DECENTRALIZATION.ipfs.map((text, id) => {
              return (
                <div
                  key={id}
                  className="d-flex col ai-c jc-c gp-32"
                  style={{
                    width: isMobileResolution ? 350 : 500,
                    minHeight: 200,
                  }}
                >
                  <div className="rombo1 d-flex ai-c jc-c">
                    <div className="rombo2 d-flex ai-c jc-c">
                      {IPFS_LOGO[id]}
                    </div>
                  </div>
                  <span>{text}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="d-flex col ai-c jc-c gp-32">
          <h4>Both</h4>
          <span>{DECENTRALIZATION.conclusion}</span>
        </div>
      </div>
    </article>
  );
}
