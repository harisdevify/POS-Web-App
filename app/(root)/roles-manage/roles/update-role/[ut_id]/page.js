'use client';

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { apiFetch } from '@/lib/api';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const UpdateRole = ({ params }) => {
  const { ut_id } = use(params);
  const [rolesData, setRolesData] = useState({ role: {}, modules: [] });
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { handleSubmit, control, setValue } = useForm();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;

    const fetchRoles = async () => {
      setLoading(true);
      try {
        const res = await apiFetch('/module-role/view', {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify({ user_id: userId, ut_id }),
        });

        if (res?.data) {
          const { role, modules } = res.data;
          setRolesData({ role, modules });

          // Initialize checkboxes from module_roles
          role?.module_roles?.forEach((r) => {
            const id = r.module_id_fk;
            setValue(`view_${id}`, !!r.is_view);
            setValue(`write_${id}`, !!r.is_writeable);
          });
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
        toast.error('Failed to load roles.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [userId, ut_id, setValue]);

  const onSubmit = async (formData) => {
    setIsProcessing(true);
    try {
      // Build updated roles array
      const formattedRoles = rolesData.modules.map((m) => {
        // find existing role mapping
        const roleMatch = rolesData.role.module_roles?.find(
          (r) => r.module_id_fk === m.module_id
        );

        return {
          role_id: roleMatch?.module_role_id || null,
          module_id: m.module_id,
          is_view: formData[`view_${m.module_id}`] ? 1 : 0,
          is_writeable: formData[`write_${m.module_id}`] ? 1 : 0,
        };
      });

      const res = await apiFetch('/module-role/update', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
          user_id: userId,
          ut_id,
          rolesArray: formattedRoles,
          role_name: rolesData?.role?.ut_name,
        }),
      });

      if (res?.status === true) {
        toast.success(res.message);
        router.push('/roles-manage/roles');
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error('Error updating roles:', err);
      toast.error('Something went wrong.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Card className="shadow-md border rounded-xl">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-medium">Update Role</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Role Name */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium">
                Role Name
              </label>
              <Input
                type="text"
                value={rolesData?.role?.ut_name || ''}
                disabled
              />
            </div>

            {/* Permissions Table */}
            <div className="overflow-x-auto table_scroll">
              <table>
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>Permissions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="py-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <Spinner />
                          <span className="text-gray-500 text-sm">
                            Loading roles...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : rolesData.modules.length ? (
                    rolesData.modules.map((m) => (
                      <tr key={m.module_id}>
                        <td>{m.module_name}</td>
                        <td>
                          <div className="flex items-center gap-6 justify-start">
                            {/* Read */}
                            <Controller
                              name={`view_${m.module_id}`}
                              control={control}
                              defaultValue={false}
                              render={({ field }) => (
                                <label className="flex items-center gap-1 text-sm">
                                  <span>Read</span>
                                  <input
                                    type="checkbox"
                                    {...field}
                                    checked={!!field.value}
                                    className="w-4 h-4 "
                                  />
                                </label>
                              )}
                            />

                            {/* Write */}
                            <Controller
                              name={`write_${m.module_id}`}
                              control={control}
                              defaultValue={false}
                              render={({ field }) => (
                                <label className="flex items-center gap-1 text-sm">
                                  <span>Write</span>
                                  <input
                                    type="checkbox"
                                    {...field}
                                    checked={!!field.value}
                                    className="w-4 h-4 "
                                  />
                                </label>
                              )}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="py-4 text-center text-gray-500 italic"
                      >
                        No permissions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Save */}
            <div className="flex justify-end mt-2">
              <Button disabled={isProcessing} variant="outline">
                {isProcessing ? 'Saving changes...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateRole;
