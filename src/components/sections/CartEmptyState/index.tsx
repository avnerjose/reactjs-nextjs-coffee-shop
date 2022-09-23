import Link from "next/link";
import { ShoppingCart } from "phosphor-react";

export function CartEmptyState() {
  return (
    <section className="flex flex-col gap-4 items-center justify-center my-8">
      <div className="flex items-center justify-center bg-brown-500 p-4 rounded-full">
        <ShoppingCart size={100} color="white" />
      </div>
      <div className="flex flex-col gap-1 items-center justify-center ">
        <h2 className="font-title text-3xl">Your cart is empty</h2>
        <p className="text-sm">
          Looks like you have not added any products to your cart yet
        </p>
      </div>
      <Link href="/catalog" passHref>
        <a className="border border-orange-500 py-3 px-12 text-orange-500 hover:bg-brown-500 hover:text-white transition-colors">
          Add products to cart
        </a>
      </Link>
    </section>
  );
}
