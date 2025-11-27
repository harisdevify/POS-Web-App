'use client';

import TableLoader from '@/components/TableLoader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiFetch } from '@/lib/api';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function AssignRoles() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [rolesData, setRolesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const res = await apiFetch('/module/get', {
          method: 'POST',
        });
        if (res) {
          setRolesData(res?.data);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmitAdd = async (formData) => {
    setIsProcessing(true);

    try {
      const formattedRoles = rolesData.map((role) => {
        const moduleId = role.module_id;
        return {
          role_id: role.module_role_id,
          module_id: moduleId,
          is_view: formData[`view_${moduleId}`] ? 1 : 0,
          is_writeable: formData[`write_${moduleId}`] ? 1 : 0,
        };
      });

      const res = await apiFetch('/module-role/create', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
          role_name: formData.modalRoleName,
          user_id: userId,
          rolesArray: formattedRoles,
        }),
      });

      if (res?.status === true) {
        toast.success(res.message);
        router.push('/roles-manage/roles');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="shadow-md border rounded-xl">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-medium">Assign Roles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form
          onSubmit={handleSubmit(onSubmitAdd)}
          className="space-y-6 card-info"
        >
          {/* Role Name Input */}
          <div>
            <label className="block mb-2 text-sm font-medium">Role Name</label>
            <Input
              {...register('modalRoleName', {
                required: 'Role name is required.',
              })}
              type="text"
              id="modalRoleName"
              placeholder="Enter a role name"
            />
            {errors.modalRoleName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.modalRoleName.message}
              </p>
            )}
          </div>
          {/* Table */}
          <div className="overflow-x-auto table_scroll">
            {loading ? (
              <TableLoader />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Module</th>
                    <th>Permissions</th>
                  </tr>
                </thead>

                <tbody>
                  {rolesData.map((m, idx) => (
                    <tr key={m.id}>
                      <td>{idx + 1}</td>
                      <td>{m.module_name}</td>
                      <td className="min-w-[200px]">
                        <div className="flex items-center justify-start gap-6 flex-wrap min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <Controller
                              name={`view_${m.module_id}`}
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 text-blue-600"
                                  {...field}
                                />
                              )}
                            />
                            <Label className="text-sm select-none">Read</Label>
                          </div>

                          {/* Write */}
                          <div className="flex items-center gap-2">
                            <Controller
                              name={`write_${m.module_id}`}
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 text-blue-600"
                                  {...field}
                                />
                              )}
                            />
                            <Label className="text-sm select-none">Write</Label>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t flex flex-wrap justify-end gap-2">
            <Button disabled={isProcessing}>
              {isProcessing ? 'Adding...' : 'Assign Role'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
