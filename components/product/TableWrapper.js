'use client';
import { productAPI } from '@/services/productAPI';
import { useState } from 'react';
import PaginationPage from '../Pagination';
import TableLoader from '../TableLoader';
import Table from './Table';

const TableWrapper = ({ initialProducts, initialPagination }) => {
  const [products, setProducts] = useState(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (page) => {
    try {
      setLoading(true);
      const res = await productAPI({ page });
      setProducts(res?.data?.products);
      setPagination(res?.data?.meta);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto table_scroll">
      {loading ? <TableLoader /> : <Table products={products} />}
      {initialPagination.total > 10 && (
        <PaginationPage
          totalItems={pagination.total}
          itemsPerPage={pagination.per_page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TableWrapper;
