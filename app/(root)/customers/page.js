import TableWrapper from '@/components/customers/TableWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customersAPI } from '@/services/customersAPI';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function Customers() {
  const res = await customersAPI({ page: 1 });
  const customers = res?.data?.users ?? [];
  const pagination = res?.data?.meta ?? {};
  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-base font-semibold flex justify-between items-center">
            Customers Overview
            <Link href={`/customers/add`} className="button-relative group">
              <span className="button-absolute group-hover:opacity-0">Add</span>
              <Plus
                size={18}
                className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
              />
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <TableWrapper
            initialCustomers={customers}
            initialPagination={pagination}
          />
        </CardContent>
      </Card>
    </div>
  );
}
