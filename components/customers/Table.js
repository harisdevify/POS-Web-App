import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { IMAGE_BASE_URL } from '@/lib/api';
import { Edit, Landmark, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
const Table = ({ customers }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Shop Name</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {customers && customers.length > 0 ? (
          customers.map((c, i) => (
            <tr key={i}>
              <td>
                <Image
                  src={`${IMAGE_BASE_URL}/${c.photo}`}
                  alt={c.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </td>

              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.shopname}</td>

              <td className="text-center border">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      ⋮
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>
                      <Link
                        href={`/customers/edit/${c.c_id}`}
                        className="flex gap-2 items-center"
                      >
                        <Edit className="w-4 h-4" />
                        View/Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={`/customers/order/${c.c_id}`}
                        className="flex gap-2 items-center"
                      >
                        <ShoppingBag size={20} /> Order
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={`/customers/transaction/${c.c_id}`}
                        className="flex gap-2 items-center"
                      >
                        <Landmark size={20} /> Transaction
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="8"
              className="text-center py-4 text-muted-foreground border"
            >
              No customers found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
