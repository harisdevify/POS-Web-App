import { dateFormat } from '@/components/DateFormat';
import { Edit } from 'lucide-react';
import Link from 'next/link';

const Table = ({ products }) => {
  return (
    <div className="overflow-x-auto table_scroll mt-6">
      <table>
        <thead>
          <tr>
            <th>
              <p className="flex justify-center items-center">Action</p>
            </th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Status</th>
            <th>Date/Time</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.s_cat_id}>
                <td>
                  <div className="flex justify-center items-center">
                    <Link
                      href={`/products/subcategories/edit/${product.s_cat_id}`}
                      variant="outline"
                      className="button-relative group"
                    >
                      <span className="button-absolute group-hover:opacity-0">
                        Edit
                      </span>
                      <Edit
                        size={18}
                        className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-sky-500"
                      />
                    </Link>
                  </div>
                </td>

                <td>{product?.bm_product_category?.p_category_name}</td>
                <td>{product?.p_sub_category_name}</td>
                <td>
                  <span
                    className={`text-xs font-medium flex justify-center items-center ${
                      product?.is_deleted == false ? 'active' : 'deactive'
                    }`}
                  >
                    {product?.is_deleted == false ? ' Active' : 'Deactive '}
                  </span>
                </td>
                <td>{dateFormat(product.timestamp)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-center py-6 text-muted-foreground"
              >
                No product sub category found in this page.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
