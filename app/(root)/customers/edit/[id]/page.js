'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function EditCustomer() {
  const [file, setFile] = useState(null);

  // React Hook Form
  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    console.log('Uploaded File:', file);
  };

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Edit Customer</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar + Upload */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border">
                <Image
                  src="/table.jpg"
                  width={80}
                  height={80}
                  alt="User"
                  className="object-cover"
                />
              </div>

              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="max-w-xs"
              />
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Name */}
              <div>
                <label className="text-sm font-medium">Customer Name *</label>
                <Input
                  placeholder="Enter customer name"
                  {...register('customerName', { required: true })}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium">Customer Phone *</label>
                <Input
                  placeholder="Enter phone number"
                  {...register('phone', { required: true })}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Customer Email</label>
                <Input placeholder="email@example.com" {...register('email')} />
              </div>

              {/* Shop Name */}
              <div>
                <label className="text-sm font-medium">Shop Name</label>
                <Input
                  placeholder="Enter shop name"
                  {...register('shopName')}
                />
              </div>

              {/* Account Holder */}
              <div>
                <label className="text-sm font-medium">Account Holder</label>
                <Input
                  placeholder="Account Holder Name"
                  {...register('accountHolder')}
                />
              </div>

              {/* Bank Name */}
              <div>
                <label className="text-sm font-medium">Bank Name</label>
                <Select
                  onValueChange={(v) => setValue('bank', v)}
                  defaultValue={watch('bank')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hbl">HBL</SelectItem>
                    <SelectItem value="ubl">UBL</SelectItem>
                    <SelectItem value="mcb">MCB</SelectItem>
                    <SelectItem value="bank-al-habib">Bank Al Habib</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Account Number */}
              <div>
                <label className="text-sm font-medium">Account Number</label>
                <Input
                  placeholder="Account Number"
                  {...register('accountNumber')}
                />
              </div>

              {/* Bank Branch */}
              <div>
                <label className="text-sm font-medium">Bank Branch</label>
                <Input placeholder="Bank Branch" {...register('bankBranch')} />
              </div>

              {/* Customer City */}
              <div>
                <label className="text-sm font-medium">Customer City *</label>
                <Select
                  onValueChange={(v) => setValue('city', v)}
                  defaultValue={watch('city')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faisalabad">Faisalabad</SelectItem>
                    <SelectItem value="lahore">Lahore</SelectItem>
                    <SelectItem value="karachi">Karachi</SelectItem>
                    <SelectItem value="islamabad">Islamabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Customer Address</label>
              <Textarea
                placeholder="Enter full address..."
                {...register('address')}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
