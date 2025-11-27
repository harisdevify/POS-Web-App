'use client';
import Table from '@/components/product/subcategory/Table';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const TableWrapper = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredProductSubCategory = products.filter((product) => {
    return (
      product.bm_product_category.p_category_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      product.p_sub_category_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <CardHeader className="border-b rounded-t-xl flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Sub Categories</CardTitle>
        <div className="flex justify-center items-center gap-2">
          <Input
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search User..."
            className="h-8 w-48"
          />
          <Link
            href="/products/subcategories/add"
            className="button-relative group "
          >
            <span className="button-absolute group-hover:opacity-0">Add</span>
            <Plus
              size={18}
              className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
            />
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <Table products={filteredProductSubCategory} />
      </CardContent>
    </div>
  );
};

export default TableWrapper;
