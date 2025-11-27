import TableWrapper from '@/components/product/subcategory/TableWrapper';
import { Card } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';

export default async function SubCategories() {
  const res = await apiFetch('/get-product-sub-cate', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({ page: 1 }),
  });

  const products_subcategory = res?.data?.data ?? [];

  return (
    <div>
      <Card className="shadow-md rounded-xl border">
        <TableWrapper products={products_subcategory} />
      </Card>
    </div>
  );
}
