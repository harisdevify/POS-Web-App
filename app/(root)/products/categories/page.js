import { dateFormat } from '@/components/DateFormat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';
import { Pencil, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function Categories() {
  const res = await apiFetch('/get-product-cate', {
    cache: 'no-store',
    method: 'POST',
  });
  const productCat = res?.data?.categories ?? [];

  return (
    <div>
      <Card className="shadow-md rounded-xl border">
        <CardHeader className="border-b rounded-t-xl flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Categories</CardTitle>
          <div className="flex justify-center items-center gap-2">
            <Link
              href="/products/categories/add"
              className="button-relative group "
            >
              <span className="button-absolute group-hover:opacity-0">Add</span>
              <Plus
                size={18}
                className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
              />
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table>
              <thead>
                <tr>
                  <th>
                    <p className="flex justify-center items-center">Action</p>
                  </th>
                  <th>Category Name</th>
                  <th>Status</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {productCat.length > 0 ? (
                  productCat.map((product) => (
                    <tr key={product.p_category_id}>
                      <td>
                        <div className="flex space-x-2 justify-center items-center">
                          <Link
                            href={`/products/categories/edit/${product.p_category_id}`}
                            className="button-relative group "
                          >
                            <Pencil
                              size={14}
                              className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-sky-500"
                            />
                            <span className="button-absolute group-hover:opacity-0">
                              Edit
                            </span>
                          </Link>
                        </div>
                      </td>

                      {/* Category Name */}
                      <td>
                        <p>{product.p_category_name}</p>
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`text-xs font-medium flex items-center justify-center gap-1 ${
                            product.is_deleted == false ? 'active' : 'deactive'
                          }`}
                        >
                          <span>
                            {product.is_deleted == false
                              ? 'Active'
                              : 'Deactive'}
                          </span>
                        </span>
                      </td>

                      <td>{dateFormat(product.timestamp)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No product category found in this page.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
