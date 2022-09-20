import Image from "next/image";
import { Trash } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useCart } from "../../../hooks";
import { formatToCurrency } from "../../../utils/format_money";

type Product = {
  id: string;
  slug: string;
  name: string;
  smallDescription: string;
  image: {
    url: string;
  };
  price: number;
  amount: number;
};

interface CartTableItemProps {
  product: Product;
}

export function CartTableItem({ product }: CartTableItemProps) {
  const [productAmount, setProductAmount] = useState(product.amount);
  const { updateProductAmount, removeProductFromCart } = useCart();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (value < 1) {
      return;
    }

    setProductAmount(value);
  };

  useEffect(() => {
    updateProductAmount(product.id, productAmount);
  }, [productAmount]);

  return (
    <tr className="border-b-2 [&>*]:pb-4 border-brown-500">
      <td>
        <Image
          height={128}
          width={64}
          src={product.image.url}
          alt={product.name}
        />
      </td>
      <td>
        <div className="flex flex-col items-start p-8">
          <span className="text-lg font-bold">{product.name}</span>
          <span className="text-sm">{product.smallDescription}</span>
        </div>
      </td>
      <td>{formatToCurrency(product.price)}</td>
      <td>
        <div className="flex items-center justify-center">
          <input
            onChange={(e) => handleAmountChange(e)}
            className="w-14 text-center"
            type="number"
            value={productAmount}
          />
        </div>
      </td>
      <td>{formatToCurrency(product.price * product.amount)}</td>
      <td>
        <Trash
          onClick={() => removeProductFromCart(product.id)}
          className="cursor-pointer"
        />
      </td>
    </tr>
  );
}
