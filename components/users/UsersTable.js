import { IMAGE_BASE_URL } from '@/lib/api';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const UsersTable = ({ users }) => {
  return (
    <div className="overflow-x-auto table_scroll">
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Salary</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((e, i) => (
              <tr key={i}>
                <td>
                  <Image
                    src={
                      `${IMAGE_BASE_URL}/${e.profile_pic}` ||
                      '/default-avatar.png'
                    }
                    alt={e.full_name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </td>
                <td>{e.full_name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.salary || 'no in API'}</td>
                <td>{e.address}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/users/edit/${e.us_id_fk}`}
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
              <td
                colSpan="8"
                className="text-center py-6 text-muted-foreground"
              >
                No Users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
