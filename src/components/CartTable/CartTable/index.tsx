import { useCart } from "../../../hooks";
import { CartTableItem } from "../CartTableItem";

export function CartTable() {
  const { products } = useCart();
  return (
    <table className="w-full max-w-screen-lg mx-auto">
      <thead>
        <tr>
          <th className="w-32"></th>
          <th className="pl-8  text-start"></th>
          <th className="w-16 text-start"></th>
          <th className="w-[6rem] text-start"></th>
          <th className="w-16 text-start"></th>
          <th className="w-16"></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <CartTableItem key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
}
