import { ShoppingCart } from "phosphor-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-beige flex items-center px-8 bg-hero bg-cover bg-center bg-no-repeat bg-fixed "
    >
      <div className="flex flex-col  items-center  max-w-2xl gap-4">
        <h1 className="font-title text-white uppercase text-8xl">
          Coffee Shop
        </h1>
        <img src="/separator.png" alt="Separator" />
        <p className="text-white text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti
          modi corrupti, adipisci rem temporibus asperiores nobis porro illo
        </p>
        <button className="flex items-center justify-center bg-transparent border border-white gap-3 text-white  py-3 px-12">
          <ShoppingCart />
          Shop Here
        </button>
      </div>
    </section>
  );
}
