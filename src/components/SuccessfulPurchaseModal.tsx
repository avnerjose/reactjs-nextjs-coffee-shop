import Modal from "react-modal";
import { CheckCircle } from "phosphor-react";
import { useCart } from "../hooks";
import Link from "next/link";

Modal.setAppElement("#__next");

interface SuccessfulPurchaseModalProps {
  isOpen: boolean;
}

export function SuccessfulPurchaseModal({
  isOpen,
}: SuccessfulPurchaseModalProps) {
  const { cleanCart } = useCart();

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content relative"
    >
      <div className="flex items-center justify-center p-4 bg-green-400 rounded-t-[0.5rem]">
        <CheckCircle
          weight="fill"
          className="text-white"
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-col p-4 gap-3 items-center justify-center">
        <h1 className="text-2xl font-title text-green-500">
          Your purchase was successful!
        </h1>

        <Link href="/" passHref>
          <a
            className="text-green-400 bg-white border-green-400 border p-2  font-semibold hover:bg-green-400 hover:text-white transition-colors"
            onClick={() => cleanCart()}
          >
            Keep Shopping
          </a>
        </Link>
      </div>
    </Modal>
  );
}
