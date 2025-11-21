'use client';

import PointOfSaleTable from '@/components/pos/PointOfSaleTable';
import ProductsTable from '@/components/pos/ProductsTable';
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
import { Check, ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function PosClient({ productsData }) {
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

  const filteredProducts = productsData.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  );

  const smallCards = [
    { lable: 'Quantity', score: cart.reduce((acc, cur) => acc + cur.qty, 0) },
    {
      lable: 'Subtotal',
      score: cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0),
    },
    {
      lable: 'Total',
      score: cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0),
    },
  ];

  const frameworks = [
    { value: 'next.js', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt.js', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="border shadow-md rounded-xl">
        <CardHeader className="border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Point of Sale</CardTitle>
        </CardHeader>

        <CardContent>
          <PointOfSaleTable
            cart={cart}
            updateQty={updateQty}
            removeFromCart={removeFromCart}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {smallCards.map((card, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-sm font-medium">{card.lable}</p>
                <span className="text-xl font-semibold">{card.score}</span>
              </div>
            ))}
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
                    ? frameworks.find((f) => f.value === value)?.label
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
                      {frameworks.map((f) => (
                        <CommandItem
                          key={f.value}
                          value={f.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? '' : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {f.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              value === f.value ? 'opacity-100' : 'opacity-0'
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
            <Button variant="outline" asChild>
              <Link href="/customers/add">Add Customer</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/customers/add">Create Invoice</Link>
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
        </CardHeader>
        <CardContent>
          <ProductsTable
            filteredProducts={filteredProducts}
            addToCart={addToCart}
          />
        </CardContent>
      </Card>
    </div>
  );
}
