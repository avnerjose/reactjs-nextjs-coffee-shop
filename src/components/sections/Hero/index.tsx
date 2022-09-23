import Link from "next/link";
import { ShoppingCart } from "phosphor-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-beige flex items-center px-8 bg-hero bg-cover bg-center bg-no-repeat bg-fixed animate-ltr-linear-infinite"
    >
      <div className="flex flex-col  items-center  max-w-2xl gap-4">
        <h1
          data-test="hero-heading"
          className="font-title text-white font-bold text-7xl"
        >
          Start your day with a black coffee
        </h1>
        <img src="/separator.png" alt="Separator" />
        <div className="flex flex-col self-start py-2 gap-2">
          <div className="flex gap-2">
            <span className="text-orange-500 font-bold">HIGH QUALITY</span>
            <span className="text-white">&</span>
            <span className="text-orange-500 font-bold">SELECTED BEANS</span>
          </div>
          <p data-test="hero-description" className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            deleniti modi corrupti, adipisci rem temporibus.
          </p>
        </div>
        <Link href="/catalog" passHref>
          <a
            data-test="shop-here-button"
            className="flex items-center justify-center bg-transparent border border-white gap-3 text-white  py-3 px-12 hover:text-orange-500 hover:bg-[rgba(255,255,255,0.9)] hover:border-orange-500 transition-colors"
          >
            <ShoppingCart />
            Shop Here
          </a>
        </Link>
      </div>
    </section>
  );
}
