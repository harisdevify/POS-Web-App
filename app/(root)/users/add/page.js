'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AddUser() {
  const [file, setFile] = useState(null);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    console.log('Uploaded File:', file);
  };

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Add User</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar + Upload */}
            <div className="flex items-center gap-6">
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full"
              />
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">User Name *</label>
                <Input
                  placeholder="Enter user name"
                  {...register('username', { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">User Phone *</label>
                <Input
                  placeholder="03XX-XXXXXXX"
                  {...register('phone', { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">User Email *</label>
                <Input
                  placeholder="email@example.com"
                  {...register('email', { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">User Salary *</label>
                <Input
                  placeholder="Enter salary"
                  {...register('salary', { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">User City</label>
                <Input placeholder="Enter city" {...register('city')} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="submit">Add User</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
