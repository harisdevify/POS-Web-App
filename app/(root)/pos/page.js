'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ---------- LEFT: POS Cart Table ---------- */}
      <Card className="border shadow-md rounded-xl">
        <CardHeader className="border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Point of Sale</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table className="border">
              <thead className="border">
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border">
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
                    <td>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}

                {cart.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No items in cart.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ---------- RIGHT: Products Table ---------- */}
      <Card className="border shadow-md rounded-xl">
        <CardHeader className="flex justify-between items-center w-full">
          <CardTitle className="text-lg font-medium w-1/2">
            Products List
          </CardTitle>
          <Input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/2"
          />
        </CardHeader>{' '}
        <CardContent>
          <div className="overflow-x-auto table_scroll">
            <table className="border">
              <thead className="border">
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border">
                      <td>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <Button
                          size="icon"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => addToCart(product)}
                        >
                          <Plus className="h-4 w-4 text-white" />
                        </Button>
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
