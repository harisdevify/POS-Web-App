'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function InvoicePage() {
  const { orderId, invoiceId } = useParams();

  const invoice = {
    logo: '/table.jpg',
    storeName: 'Mian Hardware',
    tagline: 'Tools That Elevate',
    systemName: 'Point of Sale System',
    invoiceNo: `INV-${String(invoiceId).padStart(6, '0')}`,
    date: '2025-11-17',

    billTo: {
      name: 'Test',
      email: '00887@mianhardware.com',
      phone: '00887',
      address: 'Unknown',
    },

    payment: {
      status: 'HandCash',
      paid: 1,
      due: 224,
    },

    items: [
      { item: 'Callie Morgan', price: 224, qty: 1, total: 224 },
      { item: 'Callie Morgan', price: 224, qty: 1, total: 224 },
      { item: 'Callie Morgan', price: 224, qty: 1, total: 224 },
    ],

    subtotal: 224,
    tax: 0,
    total: 224,
  };

  return (
    <Card className="invoice-container max-w-3xl mx-auto p-12 rounded-xl shadow-lg print:shadow-none  print:p-0 print:rounded-none">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-6">
        <div className="flex items-center gap-4">
          <Image
            src={invoice.logo}
            alt="Logo"
            width={90}
            height={50}
            className="rounded-md"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {invoice.storeName}
            </h1>
            <p className="text-sm ">{invoice.tagline}</p>
            <p className="text-xs mt-1 ">{invoice.systemName}</p>
          </div>
        </div>

        <div className="text-right">
          <h2 className="text-2xl font-semibold tracking-tight">INVOICE</h2>
          <p className="text-sm  mt-1">#{invoice.invoiceNo}</p>
          <p className="text-sm ">Date: {invoice.date}</p>
        </div>
      </div>

      {/* BILL TO + PAYMENT */}
      <div className="grid grid-cols-2 gap-10 border-b py-8">
        <div>
          <h3 className="font-semibold mb-2 tracking-wide">BILL TO</h3>
          <p className="font-medium ">{invoice.billTo.name}</p>
          <p className=" text-sm">{invoice.billTo.email}</p>
          <p className=" text-sm">{invoice.billTo.phone}</p>
          <p className=" text-sm">{invoice.billTo.address}</p>
        </div>

        <div className="text-right">
          <h3 className="font-semibold mb-2 tracking-wide">PAYMENT DETAILS</h3>

          <p className="text-sm">
            Status:{' '}
            <span className="px-2 py-1  text-red-700 text-xs rounded-md font-semibold">
              {invoice.payment.status}
            </span>
          </p>

          <p className="text-sm mt-1">
            Amount Paid:{' '}
            <span className="font-medium">${invoice.payment.paid}.00</span>
          </p>

          <p className="text-sm">
            Amount Due:{' '}
            <span className="font-medium">${invoice.payment.due}.00</span>
          </p>
        </div>
      </div>

      {/* ITEMS TABLE */}
      <div className="mt-8 table_scroll">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((x, i) => (
              <tr key={i}>
                <td>{x.item}</td>
                <td>${x.price}.00</td>
                <td>{x.qty}</td>
                <td>${x.total}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTALS */}
      <div className="mt-8 border-t pt-6 text-sm space-y-1">
        <div className="flex justify-between">
          <span className="font-medium">Subtotal</span>
          <span className="font-medium ">${invoice.subtotal}.00</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Tax/VAT</span>
          <span className="font-medium ">${invoice.tax}.00</span>
        </div>

        <div className="flex justify-between text-lg font-bold mt-3">
          <span>Total Amount</span>
          <span>${invoice.total}.00</span>
        </div>

        <div className="flex justify-end items-center gap-2 pt-3">
          <Button
            onClick={() => {
              window.print();
            }}
            size="sm"
            variant="outline"
            className="cursor-pointer"
          >
            Print Invoice
          </Button>
          <Button size="sm" className="cursor-pointer">
            Download PDF
          </Button>
        </div>
      </div>
    </Card>
  );
}
