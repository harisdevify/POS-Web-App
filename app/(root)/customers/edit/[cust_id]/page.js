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
import { apiFetch, IMAGE_BASE_URL } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function EditCustomer() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cities, setCities] = useState([]);

  const params = useParams();
  const router = useRouter();
  const cust_id = params?.cust_id;
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  useEffect(() => {
    const loadCities = async () => {
      try {
        const res = await apiFetch('/cities', {
          method: 'POST',
          cache: 'no-store',
        });

        if (res?.data) {
          setCities(res.data);
        } else {
          toast.error('Failed to load cities');
        }
      } catch (err) {
        console.error('City load error:', err);
      }
    };
    loadCities();
  }, []);

  // Load customer data
  useEffect(() => {
    const loadCustomer = async () => {
      const res = await apiFetch(`/customer/${cust_id}`, {
        method: 'POST',
        cache: 'no-store',
      });
      console.log(res);

      if (res?.data) {
        const c = res.data;

        reset({
          customerName: c.name,
          phone: c.phone,
          email: c.email,
          shopName: c.shopname,
          accountHolder: c.account_holder,
          bank: c.bank_name,
          accountNumber: c.account_number,
          bankBranch: c.bank_branch,
          city: c.city_id_fk?.toString(),
          address: c.address,
        });

        if (c.photo) {
          setPreview(`${IMAGE_BASE_URL}/${c.photo}`);
        }
      }
    };

    if (cust_id) loadCustomer();
  }, [cust_id, reset]);

  const onSubmit = async (data) => {
    const body = new FormData();
    body.append('id', cust_id);
    body.append('name', data.customerName);
    body.append('email', data.email);
    body.append('phone', data.phone);
    body.append('address', data.address);
    body.append('shopname', data.shopName);
    body.append('account_holder', data.accountHolder);
    body.append('account_number', data.accountNumber);
    body.append('bank_name', data.bank);
    body.append('bank_branch', data.bankBranch);
    body.append('city_id_fk', data.city);
    if (file) body.append('photo', file);

    try {
      const res = await apiFetch('/update-customer', {
        method: 'POST',
        body,
      });

      if (res?.status === true) {
        toast.success(res.message);
        router.push('/customers');
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update customer.');
    }
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
                  src={preview || '/default-avatar.png'}
                  width={80}
                  height={80}
                  alt="User"
                  className="object-cover"
                />
              </div>

              <Input
                type="file"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFile(f);
                  if (f) setPreview(URL.createObjectURL(f));
                }}
                className="max-w-xs"
              />
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Customer Name *</label>
                <Input {...register('customerName', { required: true })} />
              </div>

              <div>
                <label className="text-sm font-medium">Customer Phone *</label>
                <Input {...register('phone', { required: true })} />
              </div>

              <div>
                <label className="text-sm font-medium">Customer Email</label>
                <Input {...register('email')} />
              </div>

              <div>
                <label className="text-sm font-medium">Shop Name</label>
                <Input {...register('shopName')} />
              </div>

              <div>
                <label className="text-sm font-medium">Account Holder</label>
                <Input {...register('accountHolder')} />
              </div>

              <div>
                <label className="text-sm font-medium">Bank Name</label>
                <Input {...register('bank')} />
              </div>

              <div>
                <label className="text-sm font-medium">Account Number</label>
                <Input {...register('accountNumber')} />
              </div>

              <div>
                <label className="text-sm font-medium">Bank Branch</label>
                <Input {...register('bankBranch')} />
              </div>

              {/* City */}
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
                    {cities.map((city) => (
                      <SelectItem
                        key={city.city_id}
                        value={city.city_id.toString()}
                      >
                        {city.city_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col pt-2">
              <label className="text-sm font-medium">Customer Address</label>
              <Textarea {...register('address')} />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
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
