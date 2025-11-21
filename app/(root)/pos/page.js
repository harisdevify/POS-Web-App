import PosClient from '@/components/pos/PosClient';
import { apiFetch } from '@/lib/api';

export default async function PosPage() {
  const res = await apiFetch('/get-all-product', {
    method: 'POST',
    cache: 'no-store',
  });
  const productsData = res?.data?.products;

  return <PosClient productsData={productsData} />;
}
