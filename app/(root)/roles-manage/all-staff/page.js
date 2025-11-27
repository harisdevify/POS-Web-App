import AddStaff from '@/components/roles-manage/AddStaff';
import StaffTable from '@/components/roles-manage/staffTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';

const AllStaff = async () => {
  const res = await apiFetch('/get-staffs', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({
      page: 1,
    }),
  });

  const staff = res?.data?.staff_users ?? [];
  const pagination = res?.data?.meta ?? {};
  return (
    <>
      <Card className="overflow-hidden rounded-md border">
        {/* Heading Section */}
        <CardHeader className="border-b flex justify-between items-center">
          <CardTitle className="text-lg font-medium">All Staffs</CardTitle>
          <AddStaff />
        </CardHeader>

        {/* Table */}
        <CardContent>
          <StaffTable initialStaff={staff} initialPagination={pagination} />
        </CardContent>
      </Card>
    </>
  );
};

export default AllStaff;
