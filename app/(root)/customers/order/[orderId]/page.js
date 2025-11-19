'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreditCard, ShoppingCart, Wallet } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { use, useState } from 'react';
import { useForm } from 'react-hook-form';

const Page = ({ params }) => {
  const { orderId } = use(params);
  const [payOpen, setPayOpen] = useState(false);

  const form = useForm({ defaultValues: { paymentMethod: '', payNow: '' } });

  const stats = [
    {
      label: 'Total Balance',
      value: '1,204',
      icon: <Wallet size={22} />,
    },
    {
      label: 'Total Paid',
      value: '$32,100',
      icon: <CreditCard size={22} />,
    },
    {
      label: 'Remaining Balance',
      value: '458',
      icon: <ShoppingCart size={22} />,
    },
  ];

  const products = [
    {
      id: 1,
      orderId: '#4512',
      date: '2025-01-24',
      payment: 'Cash',
      products: 3,
      subtotal: 1800,
      invoice: 'INV-122',
      total: 2100,
    },
    {
      id: 2,
      orderId: '#4512',
      date: '2025-01-24',
      payment: 'Cash',
      products: 3,
      subtotal: 1800,
      invoice: 'INV-122',
      total: 2100,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
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
              {/* Optional icon */}
              {item.icon && <div className="p-3 rounded-lg">{item.icon}</div>}
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex justify-end items-center gap-2">
        <Button size="sm" variant="outline">
          Download PDF
        </Button>

        <Button size="sm" onClick={() => setPayOpen(true)}>
          Pay Balance
        </Button>
      </div>

      {/* Customer Orders with Search & Buttons */}
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between border-b">
          <CardTitle className="text-base font-semibold">
            Customer Orders
          </CardTitle>
          <Input placeholder="Search orders..." className="h-8 w-48" />
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Products</th>
                  <th>Sub Total</th>
                  <th>Invoice #</th>
                  <th>Total</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.orderId}</td>
                    <td>{p.date}</td>
                    <td>{p.payment}</td>
                    <td>{p.products}</td>
                    <td>Rs. {p.subtotal}</td>
                    <td>{p.invoice}</td>
                    <td>Rs. {p.total}</td>
                    <td>
                      <div className="flex justify-center">
                        <Button size="sm" variant="outline">
                          <Link
                            href={`/customers/order/${orderId}/invoice/${p.id}`}
                          >
                            Print Invoice
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pay Balance Dialog */}
      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Total Balance ₨ 224</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-medium">Payment</label>
              <Select
                className="w-full"
                onValueChange={(v) => form.setValue('paymentMethod', v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="handcash">Hand Cash</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Pay Now</label>
              <Input
                type="number"
                placeholder="Enter amount"
                {...form.register('payNow')}
              />
            </div>

            <DialogFooter>
              <Button type="submit">Submit Payment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
