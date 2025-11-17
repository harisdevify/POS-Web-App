'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit } from 'lucide-react';
import Link from 'next/link';

const data = [
  { id: 1, name: 'Admin', createdAt: '2024/01/10' },
  { id: 2, name: 'Manager', createdAt: '2024/03/22' },
  { id: 3, name: 'Cashier', createdAt: '2024/07/15' },
  { id: 4, name: 'Supervisor', createdAt: '2024/09/05' },
  { id: 5, name: 'Operator', createdAt: '2024/10/02' },
];

const Roles = () => {
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
            {data.map((role, idx) => (
              <tr key={role.id}>
                <td>{idx + 1}</td>
                <td>{role.name}</td>
                <td>{role.createdAt}</td>
                <td>
                  <div className="flex justify-center items-center">
                    <Link
                      href={`/roles-manage/roles/update-role/${role.id}`}
                      className="button-relative group"
                    >
                      {/* Default text */}
                      <span className="button-absolute group-hover:opacity-0">
                        Edit
                      </span>

                      {/* Icon appears on hover */}
                      <Edit
                        size={18}
                        className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-sky-500"
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default Roles;
