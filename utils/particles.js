import BSC from "../assets/imgs/bsc.svg";
import Ethereum from "../assets/imgs/ethereum.svg";
import Polygon from "../assets/imgs/polygon.svg";
import Avalanche from "../assets/imgs/avalanche.svg";
import Solana from "../assets/imgs/solana.svg";
import Uniswap from "../assets/imgs/uniswap.svg";
import Chainlink from "../assets/imgs/chainlink.svg";

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
    number: { limit: 7 },
    opacity: {
      value: 0.8,
      anim: {
        enable: true,
        speed: 0.3,
        opacity_min: 0.4,
        sync: false,
      },
    },
    shape: {
      type: "image",
      image: [
        {
          src: BSC.src,
        },
        {
          src: Ethereum.src,
        },
        {
          src: Polygon.src,
        },
        {
          src: Avalanche.src,
        },
        {
          src: Solana.src,
        },
        {
          src: Uniswap.src,
        },
        {
          src: Chainlink.src,
        },
      ],
    },
    size: {
      value: { min: 10, max: 30 },
    },
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      grab: {
        line_linked: {
          color: "#1dff7b",
          opacity: 0.8,
        },
        distance: 200,
      },
      repulse: {
        distance: 200,
      },
    },
  },
};
