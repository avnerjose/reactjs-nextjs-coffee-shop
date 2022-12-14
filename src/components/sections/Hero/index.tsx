import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "phosphor-react";
import { childSlideFromLeft, parent, slideFromTop } from "@animations";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-beige flex items-center px-8 bg-hero bg-cover bg-center bg-no-repeat bg-fixed "
    >
      <div className="flex flex-col  items-center  max-w-2xl gap-4">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={slideFromTop}
          transition={{ duration: 0.5 }}
          data-test="hero-heading"
          className="font-title text-white font-bold md:text-7xl text-5xl text-center md:text-left"
        >
          Start your day with a black coffee
        </motion.h1>
        <img src="/separator.png" alt="Separator" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={parent}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center md:items-start self-start py-2 gap-2"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={childSlideFromLeft}
            custom={0}
            className="flex gap-2"
          >
            <span className="text-orange-500 font-bold">HIGH QUALITY</span>
            <span className="text-white">&</span>
            <span className="text-orange-500 font-bold">SELECTED BEANS</span>
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={childSlideFromLeft}
            custom={1}
            data-test="hero-description"
            className="text-white text-center md:text-left"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            deleniti modi corrupti, adipisci rem temporibus.
          </motion.p>
        </motion.div>
        <Link href="/catalog" passHref>
          <motion.a
            initial="hidden"
            whileInView="visible"
            variants={childSlideFromLeft}
            custom={2}
            data-test="shop-here-button"
            className="flex items-center justify-center bg-transparent border border-white gap-3 text-white  py-3 px-12 hover:text-orange-500 hover:bg-[rgba(255,255,255,0.9)] hover:border-orange-500 transition-colors"
          >
            <ShoppingCart />
            Shop Here
          </motion.a>
        </Link>
      </div>
    </section>
  );
}
