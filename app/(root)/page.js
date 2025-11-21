import { ProductTable } from '@/components/dashboard/ProductTable';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';

async function getProducts() {
  return [
    {
      id: 1,
      image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
      name: 'Wireless Mouse',
      category: 'Accessories',
      stock: 120,
      buyingPrice: 900,
      sellingPrice: 1200,
      supplier: 'LogiTech',
      status: 'In Stock',
    },
    {
      id: 2,
      image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
      name: 'Bluetooth Keyboard',
      category: 'Accessories',
      stock: 80,
      buyingPrice: 1100,
      sellingPrice: 1500,
      supplier: 'KeyPro',
      status: 'Out of Stock',
    },
    {
      id: 3,
      image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
      name: 'USB-C Hub',
      category: 'Electronics',
      stock: 0,
      buyingPrice: 1400,
      sellingPrice: 1800,
      supplier: 'Kingpark',
      status: 'Out of Stock',
    },
  ];
}

async function getStats() {
  return [
    { label: 'Total Users', value: '1,204', icon: <User size={22} /> },
    { label: 'Revenue', value: '$32,100', icon: <DollarSign size={22} /> },
    { label: 'Orders', value: '458', icon: <ShoppingBag size={22} /> },
  ];
}

export default async function Dashboard() {
  const products = await getProducts();
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <Card
            key={index}
            className="rounded-2xl p-4 border shadow-sm hover:shadow-md transition-all duration-300"
          >
            <CardHeader className="p-0 flex flex-row items-center justify-between">
              <div>
                <CardDescription className="text-xs font-medium ">
                  {item.label}
                </CardDescription>

                <CardTitle className="text-3xl font-bold mt-1">
                  {item.value}
                </CardTitle>
              </div>

              {item.icon && <div className="p-3 rounded-lg">{item.icon}</div>}
            </CardHeader>
          </Card>
        ))}
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
          <ProductTable products={products} />
        </CardContent>
      </Card>
    </div>
  );
}
