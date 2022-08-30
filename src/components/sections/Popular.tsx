import Image from "next/image";
import { ShoppingCart } from "phosphor-react";
import { ProductItem } from "../ProductItem";

export function Popular() {
  return (
    <section
      id="popular"
      className="min-h-screen flex flex-col items-center justify-center py-8 bg-gray-100"
    >
      <h2 className="font-title text-4xl text-dark uppercase">
        Popular Products
      </h2>
      <img src="/separator_brown.png" alt="Separator" />
      <div className="grid grid-cols-5  w-full gap-8 px-8 mt-4">
        {/* <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem /> */}
      </div>
    </section>
  );
}
