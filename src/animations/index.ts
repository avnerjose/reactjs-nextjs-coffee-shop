import { Variants } from "framer-motion";

export const slideFromTop: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: { opacity: 1, y: 0 },
};

export const parent: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.5,
      staggerChildren: 0.4,
    },
  },
};

export const childSlideFromLeft: Variants = {
  hidden: { x: "-10vh", opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.3,
    },
  }),
};
