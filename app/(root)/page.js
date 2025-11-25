import { ProductTable } from '@/components/dashboard/ProductTable';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { apiFetch } from '@/lib/api';
import { CreditCard, ShoppingCart, Wallet } from 'lucide-react';
import Link from 'next/link';

export default async function Dashboard() {
  const res = await apiFetch('/dashboard', {
    method: 'POST',
    cache: 'no-store',
  });
  const product = res.data;
  console.log(product);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl p-4 border shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="p-0 flex flex-row items-center justify-between">
            <div>
              <CardDescription className="text-xs font-medium">
                Total Orders
              </CardDescription>
              <CardTitle className="text-3xl font-bold mt-1">
                {product?.complete_orders}
              </CardTitle>
            </div>

            <div className="p-3 rounded-lg  text-blue-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </CardHeader>
        </Card>

        <Card className="rounded-2xl p-4 border shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="p-0 flex flex-row items-center justify-between">
            <div>
              <CardDescription className="text-xs font-medium">
                Total Paid
              </CardDescription>
              <CardTitle className="text-3xl font-bold mt-1">
                {product?.total_paid}
              </CardTitle>
            </div>

            <div className="p-3 rounded-lg text-green-600">
              <Wallet className="w-6 h-6" />
            </div>
          </CardHeader>
        </Card>

        <Card className="rounded-2xl p-4 border shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader className="p-0 flex flex-row items-center justify-between">
            <div>
              <CardDescription className="text-xs font-medium">
                Total Due
              </CardDescription>
              <CardTitle className="text-3xl font-bold mt-1">
                {product?.total_due}
              </CardTitle>
            </div>

            <div className="p-3 rounded-lg text-red-600">
              <CreditCard className="w-6 h-6" />
            </div>
          </CardHeader>
        </Card>
      </div>
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between border-b">
          <CardTitle className="text-base font-semibold">
            New Products
          </CardTitle>
          <Link href="/products">
            <Button size="sm" variant="outline">
              View All
            </Button>
          </Link>
        </CardHeader>

        <CardContent>
          <ProductTable products={product?.new_products} />
        </CardContent>
      </Card>
    </div>
  );
}
