import { Trash2 } from 'lucide-react';
import { Input } from '../ui/input';

const PointOfSaleTable = ({ cart, updateQty, removeFromCart }) => {
  return (
    <div className="overflow-x-auto table_scroll">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>
              <p className="flex justify-center items-center">Action</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <Input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, e.target.value)}
                    className="w-16 text-center"
                  />
                </td>
                <td>{item.price}</td>
                <td>{item.qty * item.price}</td>
                <td className="text-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="button-relative group"
                  >
                    {/* Default text */}
                    <span className="button-absolute group-hover:opacity-0">
                      Delete
                    </span>

                    {/* Icon appears on hover */}
                    <Trash2
                      size={18}
                      className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-red-500"
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No items in cart.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PointOfSaleTable;
