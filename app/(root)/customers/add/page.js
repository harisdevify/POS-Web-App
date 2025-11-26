'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
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
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

export default  function AddCustomer() {
  const [cities, setCities] = useState([])
  const [file, setFile] = useState(null);
useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await apiFetch('/cities', {
          cache: 'no-store',
          method: 'POST',
        });
        if (res?.data) {
          setCities(res.data);
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error('Failed to load cities.');
      }
    };
    fetchCities();
  }, []);
console.log(cities)
  // React Hook Form
  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit =async (data) => {
    const formData = {
      name:data.customerName,
      email:data.email,
      phone:data.phone,
      address:data.address,
      shopname:data.shopname,
      account_holder:data.accountHolder,
      account_number:data.accountNumber,
      bank_name:data.bank,
      bank_branch:data.bankBranch,
      city_id_fk:data.city,
      address:data.address,
      photo:file

    }
    
    try {
      const res = await apiFetch('/store-customer', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(formData),
      });
      console.log(res);
      if (res?.status === true) {
        toast.success(res.message);
        
      } else toast.error(res.message);
    } catch (err) {
      toast.error('Error while adding customer.');
    }
    console.log('Form Data:', data);
    console.log('Uploaded File:', file);
  };

  return (
    <div>
      <Card className="border shadow-sm rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Add Customer</CardTitle>
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
                <Input
                  placeholder="Account Holder Name"
                  {...register('bank')}
                />
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
                    {cities.map((city,index) => {
                      return <SelectItem key={index} value={city.city_id.toString()}>
  {city.city_name}
</SelectItem>

                    })}
                   
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
