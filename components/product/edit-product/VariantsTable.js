'use client';

import { Edit } from 'lucide-react';
import Link from 'next/link';

export function VariantsTable({ products, productId, onAddVariant }) {
  return (
    <div className="overflow-x-auto table_scroll">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Available Quantity</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products?.map((p) => (
              <tr key={p.p_v_id} className="border-t">
                <td>{p.p_v_id || '--'}</td>
                <td>{p.p_v_name || '--'}</td>
                <td>{p.final_price || '--'}</td>
                <td>
                  <span className="px-2 py-1 rounded text-xs">
                    {p.available_quantity || '--'}
                  </span>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs border ${
                      p.is_deleted == false ? 'active' : 'deactive'
                    }`}
                  >
                    {p.is_deleted == false ? 'Active' : 'Deactive'}
                  </span>
                </td>
                <td className="text-center">
                  <Link
                    href={`/products/edit-product/${productId}/edit-prod-variant/${p.p_v_id}`}
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
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center p-4">
                No variants found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
