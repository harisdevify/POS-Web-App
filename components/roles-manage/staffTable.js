'use client';

import { apiFetch } from '@/lib/api';
import { useState } from 'react';
import { toast } from 'sonner';
import PaginationPage from '../Pagination';
import TableLoader from '../TableLoader';

const StaffTable = ({ initialStaff, initialPagination }) => {
  const [staff, setStaff] = useState(initialStaff || []);
  const [pagination, setPagination] = useState(initialPagination || {});
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (page) => {
    try {
      setLoading(true);
      const res = await apiFetch('/get-staffs', {
        method: 'POST',
        body: JSON.stringify({
          page,
        }),
      });

      if (res?.data?.staff_users) setStaff(res?.data?.staff_users);
      if (res?.data?.meta) setPagination(res?.data?.meta);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto table_scroll">
        {loading ? (
          <TableLoader />
        ) : staff.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No staff found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>User Type</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.bm_user_type.ut_name}</td>
                  <td>{user.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {initialPagination.total > 10 && (
        <PaginationPage
          totalItems={pagination.total}
          itemsPerPage={pagination.per_page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default StaffTable;
