'use client';

import { customersAPI } from '@/services/customersAPI';
import { useState } from 'react';
import PaginationPage from '../Pagination';
import TableLoader from '../TableLoader';
import Table from './Table';
const TableWrapper = ({ initialCustomers, initialPagination }) => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (page) => {
    try {
      setLoading(true);
      const res = await customersAPI({ page });
      setCustomers(res?.data?.users);
      setPagination(res?.data?.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto table_scroll">
      {loading ? <TableLoader /> : <Table customers={customers} />}

      {pagination.total > 10 && (
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
