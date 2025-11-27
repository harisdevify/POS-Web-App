'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { apiFetch } from '@/lib/api';
import { Edit, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function RolesModules() {
  const [loading, setLoading] = useState(true);
  const [rolesModule, setRolesModule] = useState([]);
  const [editData, setEditData] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [showModal, setShowModal] = useState(false);
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/module/get', {
        method: 'POST',
        cache: 'no-store',
      });
      if (res) {
        setRolesModule(res.data);
      }
    } catch (err) {
      toast.error('Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Roles
  useEffect(() => {
    fetchRoles();
  }, []);

  // Open Add Modal
  const openAddModal = () => {
    setEditData(null);
    reset({ module_name: '' });
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (role) => {
    setEditData(role);
    reset({ module_name: role.module_name });
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      let bodyData;
      let res;
      if (editData) {
        bodyData = { ...data, module_id: editData.module_id };
        res = await apiFetch(`/module/update`, {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify(bodyData),
        });
      } else {
        res = await apiFetch('/module/create', {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify(data),
        });
      }
      if (res?.status === true) {
        toast.success(res.message);
        setShowModal(false);
        reset();
        await fetchRoles();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Card className="overflow-hidden rounded-md border">
      <CardHeader className="border-b flex justify-between items-center">
        <CardTitle className="text-lg font-medium">Role Modules</CardTitle>

        {/* Add Button */}
        <button
          onClick={openAddModal}
          size="icon"
          className="button-relative group"
        >
          <span className="button-absolute group-hover:opacity-0">Add</span>
          <Plus
            size={18}
            className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
          />
        </button>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="overflow-x-auto table_scroll">
          {loading ? (
            <div className="overflow-x-auto table_scroll animate-pulse">
              <table>
                <thead>
                  <tr>
                    {[...Array(3)].map((_, i) => (
                      <th key={i} className="px-4 py-2">
                        <div className="h-6 w-24 bg-gray-200 rounded"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2 ">
                        <div className="flex gap-2">
                          <div className="h-6 bg-gray-200 rounded w-32"></div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="h-6 w-28 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="h-6 w-36 bg-gray-200 rounded"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {rolesModule.length > 0 ? (
                  rolesModule.map((role, idx) => (
                    <tr key={role.module_id}>
                      <td>{idx + 1}</td>
                      <td>{role.module_name}</td>
                      <td>
                        <button
                          size="icon"
                          className="button-relative group"
                          onClick={() => openEditModal(role)}
                        >
                          <span className="button-absolute group-hover:opacity-0">
                            Edit
                          </span>
                          <Edit
                            size={18}
                            className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-sky-500"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No roles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>

      <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editData ? 'Edit Role Module' : 'Add Role Module'}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 card-info"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Module Name
              </label>
              <Input
                {...register('module_name', { required: true })}
                type="text"
                placeholder="Enter module name"
              />
            </div>

            <DialogFooter className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowModal(false)}
                className="deActive-btn text-sm"
              >
                Cancel
              </Button>
              <Button type="submit" className="active-btn text-sm">
                {editData ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
