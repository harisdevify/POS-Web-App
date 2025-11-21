import { Edit } from 'lucide-react';
import Link from 'next/link';

const Table = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Availability</th>
          <th>Status</th>
          <th>
            <p className="flex justify-center items-center">Action</p>
          </th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.product_id}>
            <td>{p.product_name}</td>
            <td>{p.bm_product_category?.p_category_name}</td>
            <td>{p.bm_product_sub_category?.p_sub_category_name}</td>
            <td>
              <span
                className={`px-2 py-1 rounded text-xs border ${
                  p.Availability === 'In Stock' ? 'active' : 'deactive'
                }`}
              >
                {p.Availability}
              </span>
            </td>
            <td>
              <span
                className={`px-2 py-1 rounded text-xs border ${
                  p.is_deleted == 0 ? 'active' : 'deactive'
                }`}
              >
                {p.is_deleted == 0 ? 'active' : 'deactive'}
              </span>
            </td>

            <td>
              <div className="flex justify-center items-center">
                <Link
                  href={`/products/edit-product/${p.id}`}
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
