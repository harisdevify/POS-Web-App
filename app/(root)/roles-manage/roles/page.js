'use client';
import { dateFormat } from '@/components/DateFormat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';
import { Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await apiFetch('/get-usertype', {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify({
            page: 1,
            user_id: Number(userId),
          }),
        });
        if (res) {
          setRoles(res?.data ?? []);
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error('Failed to fetch roles ');
      }
    };

    fetchRoles();
  }, [userId]);

  return (
    <Card className="shadow-md border rounded-xl">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-medium">Roles Overview</CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto table_scroll">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Created Date</th>
              <th>
                <p className="flex justify-center items-center">Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map((role, idx) => (
                <tr key={role.ut_id}>
                  <td>{idx + 1}</td>
                  <td>{role.ut_name}</td>
                  <td>{dateFormat(role.ut_date)}</td>
                  <td>
                    <div className="flex justify-center items-center">
                      <Link
                        href={`/roles-manage/roles/update-role/${role.ut_id}`}
                        className="button-relative group"
                      >
                        <span className="button-absolute group-hover:opacity-0">
                          Edit
                        </span>

                        <Edit
                          size={18}
                          className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-sky-500"
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default Roles;
