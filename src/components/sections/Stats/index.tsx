import { childSlideFromLeft, parent } from "@animations";
import { motion } from "framer-motion";

const STATS_INFO = [
  {
    label: "Coffee Varieties",
    amount: 120,
  },
  {
    label: "Tested Hours",
    amount: 50,
  },
  {
    label: "Coffee Brands",
    amount: 200,
  },
  {
    label: "Coffee Markets",
    amount: 265,
  },
];

export function Stats() {
  return (
    <section className="flex items-center justify-center bg-brown-500">
      <motion.ul
        initial="hidden"
        whileInView="visible"
        variants={parent}
        className="flex"
      >
        {STATS_INFO.map(({ label, amount }, index) => (
          <motion.li
            initial="hidden"
            whileInView="visible"
            variants={childSlideFromLeft}
            custom={index}
            key={label.trim()}
            className="flex flex-col items-center justify-center  px-4 py-10"
          >
            <div className="font-title text-4xl flex gap-2">
              <span className="text-white">{amount}</span>
              <span className="font-bold">+</span>
            </div>
            <span className="text-white font-title text-xl">{label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
