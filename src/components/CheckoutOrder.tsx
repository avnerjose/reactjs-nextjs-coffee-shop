import { formatToCurrency } from "../utils/format_money";

export function CheckoutOrder() {
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
          <tr className="[&>*]:border-b [&>*]:border-dashed">
            <td className="text-gray-400">
              <span>Nome x2</span>
            </td>
            <td className="text-gray-400">{formatToCurrency(100)}</td>
          </tr>
          <tr className="[&>*]:border-b [&>*]:border-dashed">
            <td>Subtotal</td>
            <td className="text-gray-400">{formatToCurrency(200)}</td>
          </tr>
          <tr className="[&>*]:border-b [&>*]:border-dashed">
            <td>Shipping</td>
            <td className="text-gray-400">{formatToCurrency(5)}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td className="font-semibold text-dark">{formatToCurrency(205)}</td>
          </tr>
        </tbody>
      </table>
    </aside>
  );
}
