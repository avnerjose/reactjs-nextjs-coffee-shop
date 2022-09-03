import { useCart } from "../hooks";
import { formatToCurrency } from "../utils/format_money";

export function CheckoutOrder() {
  const { products, totalProductsPrice, shippingPrice } = useCart();

  return (
    <aside className="flex-1 flex flex-col p-8">
      <h3 className="font-title text-lg mb-4">Your Order</h3>
      <table className="border-separate border-spacing-y-2">
        <thead>
          <tr className="[&>*]:font-normal [&>*]:text-left">
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, name, amount, price }) => (
            <tr key={id} className="[&>*]:border-b [&>*]:border-dashed">
              <td className="text-gray-400">
                <span>
                  {name} x{amount}
                </span>
              </td>
              <td className="text-gray-400">
                {formatToCurrency(amount * price)}
              </td>
            </tr>
          ))}
          <tr className="[&>*]:border-b [&>*]:border-dashed">
            <td>Subtotal</td>
            <td className="text-gray-400">
              {formatToCurrency(totalProductsPrice)}
            </td>
          </tr>
          <tr className="[&>*]:border-b [&>*]:border-dashed">
            <td>Shipping</td>
            <td className="text-gray-400">{formatToCurrency(shippingPrice)}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td className="font-semibold text-dark">
              {formatToCurrency(totalProductsPrice + shippingPrice)}
            </td>
          </tr>
        </tbody>
      </table>
    </aside>
  );
}
