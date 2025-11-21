import { Plus } from 'lucide-react';
import Image from 'next/image';

const ProductsTable = ({ filteredProducts, addToCart }) => {
  return (
    <div className="overflow-x-auto table_scroll">
      <table>
        <thead>
          <tr>
            <th>
              <p className="flex justify-center items-center">Photo</p>
            </th>
            <th>Name</th>
            <th>Price</th>
            <th>
              <p className="flex justify-center items-center">Action</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.product_id}>
                <td>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </td>
                <td className="min-w-[300px]">{product.product_name}</td>
                <td>{product.price || '--'}</td>
                <td className="text-center">
                  <button
                    onClick={() => addToCart(product)}
                    className="button-relative group"
                  >
                    {/* Default text */}
                    <span className="button-absolute group-hover:opacity-0">
                      Add
                    </span>

                    {/* Icon appears on hover */}
                    <Plus
                      size={18}
                      className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-600"
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                Product not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
