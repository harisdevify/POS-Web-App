'use client';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usersAPI } from '@/services/usersAPI';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import PaginationPage from '../Pagination';
import TableLoader from '../TableLoader';
import { Input } from '../ui/input';
import UsersTable from './UsersTable';

const TableWrapper = ({ initialUsers, initialPagination }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (page) => {
    try {
      setLoading(true);
      const res = await usersAPI({ page });
      setUsers(res?.data?.users);
      setPagination(res?.data?.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredUsers = users.filter((user) => {
    return user.full_name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return (
    <>
      <CardHeader className="border-b rounded-t-xl flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Users</CardTitle>
        <div className="flex justify-center items-center gap-2">
          <Input
            placeholder="Search User..."
            className="h-8 w-48"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Link href={`/users/add`} className="button-relative group">
            <span className="button-absolute group-hover:opacity-0">Add</span>
            <Plus
              size={18}
              className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
            />
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? <TableLoader /> : <UsersTable users={filteredUsers} />}

        {pagination.total > 10 && (
          <PaginationPage
            totalItems={pagination.total}
            itemsPerPage={pagination.per_page}
            onPageChange={handlePageChange}
          />
        )}
      </CardContent>
    </>
  );
};

export default TableWrapper;
