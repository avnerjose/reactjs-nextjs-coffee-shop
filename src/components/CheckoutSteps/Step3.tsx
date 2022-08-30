import Link from "next/link";
import { ArrowLeft } from "phosphor-react";

interface Step3Props {
  handleReturn: () => void;
}

export function Step3({ handleReturn }: Step3Props) {
  return (
    <div className="flex-[1.5] flex flex-col p-8">
      <h3 className="font-title text-lg mb-4">Payment method</h3>
      <div className="flex flex-col">
        <label className="flex items-center gap-2">
          <input className="accent-brown-500" type="radio" name="delivery" />
          Credit Card
          <img className="h-8" src="/card_operators.png" alt="Card operators" />
        </label>
        <label className="flex items-center gap-2">
          <input className="accent-brown-500" type="radio" name="delivery" />
          PIX
        </label>
        <label className="flex items-center gap-2">
          <input className="accent-brown-500" type="radio" name="delivery" />
          Paypal
        </label>
      </div>
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => handleReturn()}
          className="flex items-center justify-center gap-2"
        >
          <ArrowLeft />
          <span>Return</span>
        </button>
        <button className="bg-brown-500 py-2 px-10 text-white">
          <span>Finish Order</span>
        </button>
      </div>
      <footer className="flex items-center gap-2 mt-4">
        Page
        <span className="flex items-center justify-center bg-brown-500 text-white w-8 h-8  rounded-full">
          3
        </span>
        of
        <span className="flex items-center justify-center bg-brown-500 text-white w-8 h-8  rounded-full">
          3
        </span>
      </footer>
    </div>
  );
}
