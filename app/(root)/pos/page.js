'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
const productsData = [
  {
    id: 1,
    name: 'Kingpark Cylinder',
    price: 1800,
    image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
  },
  {
    id: 2,
    name: 'Hi Power Cylinder',
    price: 1000,
    image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
  },
  {
    id: 3,
    name: 'For Park Cylinder',
    price: 1000,
    image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
  },
  {
    id: 4,
    name: 'IBM Cylinder',
    price: 1000,
    image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
  },
  {
    id: 5,
    name: 'Elmax Cylinder',
    price: 1200,
    image: 'https://pos.mianhardware.com/assets/images/product/default.webp',
  },
];

export default function Pos() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const smallCards = [
    { lable: 'Quantity', score: '0' },
    { lable: 'Subtotal', score: '0' },
    { lable: 'Total', score: '0' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ---------- LEFT: POS Cart Table ---------- */}
      <Card className="border shadow-md rounded-xl">
        <CardHeader className="border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Point of Sale</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th>
                    <p className="flex justify-center items-center">Action</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <Input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => updateQty(item.id, e.target.value)}
                          className="w-16 text-center"
                        />
                      </td>
                      <td>{item.price}</td>
                      <td>{item.qty * item.price}</td>
                      <td className="text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="button-relative group"
                        >
                          {/* Default text */}
                          <span className="button-absolute group-hover:opacity-0">
                            Delete
                          </span>

                          {/* Icon appears on hover */}
                          <Trash2
                            size={18}
                            className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-red-500"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No items in cart.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {smallCards.map((card, i) => {
              return (
                <div
                  key={i}
                  className="border border-border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-sm font-medium">{card.lable}</p>
                  <span className="text-xl font-semibold">{card.score}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end w-full">
            <Select onValueChange={(value) => console.log('Selected:', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applyDiscount">Apply Discount</SelectItem>
                <SelectItem value="clearCart">Clear Cart</SelectItem>
                <SelectItem value="checkout">Checkout</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-1 w-full mt-4">
            <Button size="sm" variant="outline" className="cursor-pointer">
              Add Customer
            </Button>
            <Button size="sm" variant="outline" className="cursor-pointer">
              Create Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ---------- RIGHT: Products Table ---------- */}
      <Card className="border shadow-md rounded-xl">
        <CardHeader className="border-b flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Products List</CardTitle>
          <Input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/2"
          />
        </CardHeader>{' '}
        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table>
              <thead>
                <tr>
                  <th>
                    <p className="flex justify-center items-center">Photo</p>
                  </th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>
                    <p className="flex justify-center items-center">Action</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td className="text-center">
                        <button
                          onClick={() => addToCart(product)}
                          className="button-relative group"
                        >
                          {/* Default text */}
                          <span className="button-absolute group-hover:opacity-0">
                            Add
                          </span>

                          {/* Icon appears on hover */}
                          <Plus
                            size={18}
                            className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-600"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Product not found
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
