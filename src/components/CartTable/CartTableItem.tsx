import { Trash } from "phosphor-react";
import { formatToCurrency } from "../../utils/format_money";

type Product = {
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
  return (
    <tr className="border-b-2 [&>*]:pb-4 border-brown-500">
      <td>
        <img className="h-32" src={product.image.url} alt={product.name} />
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
          <input className="w-14 text-center" type="number" value={3} />
        </div>
      </td>
      <td>{formatToCurrency(product.price * product.amount)}</td>
      <td>
        <Trash />
      </td>
    </tr>
  );
}
