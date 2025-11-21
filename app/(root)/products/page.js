import TableWrapper from '@/components/product/TableWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { productAPI } from '@/services/productAPI';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function Products() {
  const res = await productAPI({ page: 1 });
  const products = res?.data?.products ?? [];
  const pagination = res?.data?.meta ?? {};

  return (
    <div>
      <Card className="border rounded-md shadow-sm">
        <CardHeader className="border-b py-2 flex justify-between items-center">
          <CardTitle className="text-base font-semibold">
            All Products
          </CardTitle>
          <div className="flex justify-center items-center gap-2">
            <Input placeholder="Search product..." className="h-8 w-48" />
            <Link
              href={`/products/add-product`}
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
          <TableWrapper
            initialProducts={products}
            initialPagination={pagination}
          />
        </CardContent>
      </Card>
    </div>
  );
}
