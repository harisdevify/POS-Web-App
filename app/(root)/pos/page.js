'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Pos() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

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
  ];
  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const smallCards = [
    { lable: 'Quantity', score: '0' },
    { lable: 'Subtotal', score: '0' },
    { lable: 'Total', score: '0' },
  ];

  const frameworks = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : 'Select framework...'}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search framework..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? '' : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {framework.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              value === framework.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
