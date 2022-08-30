import Link from "next/link";
import { formatToCurrency } from "../../utils/format_money";

export function CartFooter() {
  return (
    <footer className="bg-brown-500">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto p-8 gap-4 text-white">
        <Link href="/catalog">
          <a className="border border-white text-white font-bold text-xs flex items-center justify-center p-3 rounded-3xl uppercase transition-colors hover:bg-white hover:text-brown-500">
            Keep Shopping
          </a>
        </Link>
        <div className="flex items-center justify-center gap-5">
          <div className="flex flex-col text-gray-100">
            <span>Subtotal</span>
            <span className="text-lg">{formatToCurrency(20)}</span>
          </div>
          <div className="flex flex-col text-gray-100">
            <span>Shipping</span>
            <span className="text-lg">{formatToCurrency(5)}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Total</span>
            <span className="text-lg font-bold">
              {formatToCurrency(20 + 5)}
            </span>
          </div>
          <Link href="/checkout">
            <a className="bg-white transition-colors h-full border text-brown-500 font-bold text-xs flex items-center justify-center p-3 rounded-3xl uppercase hover:bg-transparent hover:text-white  hover:border-white">
              Proceed to checkout
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
