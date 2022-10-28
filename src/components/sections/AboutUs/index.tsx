import { motion } from "framer-motion";
import { slideFromTop } from "@animations";

export function AboutUs() {
  return (
    <section
      id="about"
      className="px-8 min-h-screen relative bg-about bg-cover text-white"
    >
      <div className="flex flex-col items-center justify-center min-h-screen z-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={slideFromTop}
          data-test="about-heading"
          className="font-title text-4xl uppercase"
        >
          About Us
        </motion.h2>
        <motion.img
          initial="hidden"
          whileInView="visible"
          variants={slideFromTop}
          src="/separator.png"
          alt="Separator"
        />
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={slideFromTop}
          transition={{ delay: 0.5 }}
          data-test="about-description"
          className="text-center mt-8 w-[70%]"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
          beatae? Cupiditate, eligendi. Molestiae maiores repudiandae, nostrum
          natus veritatis quibusdam vel inventore sapiente! Omnis voluptatibus
          illo laboriosam laborum reiciendis similique labore!
        </motion.p>
      </div>
    </section>
  );
}
