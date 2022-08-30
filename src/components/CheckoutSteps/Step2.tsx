import { ArrowLeft } from "phosphor-react";
import { formatToCurrency } from "../../utils/format_money";

interface Step2Props {
  handleNext: () => void;
  handleReturn: () => void;
}

export function Step2({ handleNext, handleReturn }: Step2Props) {
  return (
    <div className="flex-[1.5] flex flex-col p-8">
      <h3 className="font-title text-lg mb-4">Delivery Address</h3>
      <input
        placeholder="Street"
        className="border border-gray-200 p-2 mb-4"
        type="text"
      />
      <div className="flex gap-8 mb-4">
        <input
          className="w-full p-2 border border-gray-200"
          placeholder="ZIP Code"
          type="text"
        />
        <input
          className="w-full p-2 border border-gray-200"
          placeholder="Number"
          type="text"
        />
      </div>
      <div className="flex gap-8 mb-4">
        <input
          className="w-full p-2 border border-gray-200"
          placeholder="City"
          type="text"
        />
        <input
          className="w-full p-2 border border-gray-200"
          placeholder="Neighborhood"
          type="text"
        />
      </div>
      <div>
        <h3 className="font-title text-lg mb-4">Delivery Method</h3>
        <div className="flex flex-col">
          <label className="flex items-center gap-2">
            <input className="accent-brown-500" type="radio" name="delivery" />
            <span className="text-sm">Delivery</span>
            <span className="font-semibold">{formatToCurrency(10)}</span>
          </label>
          <label className="flex items-center gap-2">
            <input className="accent-brown-500" type="radio" name="delivery" />
            <span className="text-sm">Self-pickup</span>
            <span className="font-semibold">{formatToCurrency(0)}</span>
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => handleReturn()}
          className="flex items-center justify-center gap-2"
        >
          <ArrowLeft />
          <span>Return</span>
        </button>
        <button
          onClick={() => handleNext()}
          className="bg-brown-500 py-2 px-10 text-white"
        >
          <span>Next</span>
        </button>
      </div>

      <footer className="flex items-center gap-2 mt-4">
        Page
        <span className="flex items-center justify-center bg-brown-500 text-white w-8 h-8  rounded-full">
          2
        </span>
        of
        <span className="flex items-center justify-center bg-brown-500 text-white w-8 h-8  rounded-full">
          3
        </span>
      </footer>
    </div>
  );
}