export const ParticleConfig = {
  fullScreen: { enable: false },
  background: { color: "#131416" },
  fpsLimit: 120,
  particles: {
    color: { value: "#ffffff" },
    move: {
      direction: "none",
      enable: true,
      outModes: "out",
      random: false,
      speed: 1,
      straight: false,
    },
    number: { density: { enable: true, area: 500 }, value: 8 },
    opacity: {
      value: 0.7,
    },
    shape: {
      type: "image",
      image: [
        {
          src: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024",
        },
        {
          src: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=024",
        },
        {
          src: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024",
        },
        {
          src: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=024",
        },
        {
          src: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=024",
        },
        {
          src: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=024",
        },
        {
          src: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=024",
        },
        {
          src: "https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=024",
        },
      ],
    },
    size: {
      value: { min: 10, max: 15 },
    },
  },
};
