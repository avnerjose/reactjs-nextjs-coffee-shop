import { Trash } from "phosphor-react";
import { formatToCurrency } from "../../utils/format_money";

export function CartTableItem() {
  return (
    <tr className="border-b-2 [&>*]:pb-4 border-brown-500">
      <td>
        <img className="h-32" src="/costa_rica.png" alt="" />
      </td>
      <td>
        <div className="flex flex-col items-start p-8">
          <span className="text-lg font-bold">Costa Rica</span>
          <span className="text-sm">Small Description</span>
        </div>
      </td>
      <td>{formatToCurrency(4)}</td>
      <td>
        <div className="flex items-center justify-center">
          <input className="w-14 text-center" type="number" value={3} />
        </div>
      </td>
      <td>{formatToCurrency(3 * 4)}</td>
      <td>
        <Trash />
      </td>
    </tr>
  );
}
