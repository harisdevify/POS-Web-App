import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import UsersTable from '@/components/users/UsersTable';
import { Plus } from 'lucide-react';
import Link from 'next/link';

async function initialUsers() {
  return [
    {
      id: 1,
      photo: '/table.jpg',
      name: 'Ali Raza',
      email: 'ali.raza@example.com',
      phone: '0300-1112233',
      salary: '50,000',
      city: 'Lahore',
    },
    {
      id: 2,
      photo: '/table.jpg',
      name: 'Ahmed Khan',
      email: 'ahmed.khan@example.com',
      phone: '0301-2223344',
      salary: '45,000',
      city: 'Karachi',
    },
  ];
}

export default async function Users() {
  const users = await initialUsers();

  return (
    <div>
      <Card className="shadow-md rounded-xl border">
        {/* Header with soft color */}
        <CardHeader className="border-b rounded-t-xl flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Users</CardTitle>
          <div className="flex justify-center items-center gap-2">
            <Input placeholder="Search User..." className="h-8 w-48" />
            <Link href={`/users/add`} className="button-relative group">
              <span className="button-absolute group-hover:opacity-0">Add</span>
              <Plus
                size={18}
                className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
              />
            </Link>
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent>
          <UsersTable users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
