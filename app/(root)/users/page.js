import { Card } from '@/components/ui/card';
import TableWrapper from '@/components/users/TableWrapper';
import { usersAPI } from '@/services/usersAPI';

export default async function Users() {
  const res = await usersAPI({ page: 1 });
  const users = res?.data?.users ?? [];
  const pagination = res?.data?.meta ?? {};
  return (
    <div>
      <Card className="shadow-md rounded-xl border">
        <TableWrapper initialUsers={users} initialPagination={pagination} />
      </Card>
    </div>
  );
}
