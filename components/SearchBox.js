'use client';

import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBox({ initialValue = '' }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    router.push(value ? `/products?search=${value}` : '/products');
  };

  return (
    <Input
      value={query}
      onChange={handleSearch}
      placeholder="Search product..."
      className="h-8 w-48"
    />
  );
}
