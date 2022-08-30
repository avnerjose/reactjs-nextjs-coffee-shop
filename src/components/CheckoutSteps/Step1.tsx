import Link from "next/link";
import { ArrowLeft } from "phosphor-react";

interface Step1Props {
  handleNext: () => void;
}

export function Step1({ handleNext }: Step1Props) {
  return (
    <div className="flex-[1.5] flex flex-col p-8">
      <h3 className="font-title text-lg mb-4">Contacts</h3>
      <div className="flex gap-8 mb-4">
        <input
          className="w-full p-2 border border-gray-200"
          placeholder="First name"
          type="text"
        />
        <input
          className="w-full p-2 border border-gray-200"
          placeholder="Last name"
          type="text"
        />
      </div>
      <input
        placeholder="Phone number"
        className="border border-gray-200 p-2"
        type="text"
      />
      <div className="flex items-center justify-between mt-8">
        <Link href="/cart">
          <a className="flex items-center justify-center gap-2">
            <ArrowLeft />
            <span>Return</span>
          </a>
        </Link>
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
          1
        </span>
        of
        <span className="flex items-center justify-center bg-brown-500 text-white w-8 h-8  rounded-full">
          3
        </span>
      </footer>
    </div>
  );
}
