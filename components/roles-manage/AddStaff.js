'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { apiFetch } from '@/lib/api';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AddStaff = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

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
      } catch (error) {
        console.error('City load error:', error);
      }
    };
    loadCities();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserTypes = async () => {
      try {
        const res = await apiFetch('/get-usertype', {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify({ user_id: userId }),
        });

        if (res?.data) {
          setUserTypes(res.data);
        } else {
          toast.error(res?.message);
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching user types');
      }
    };
    fetchUserTypes();
  }, [userId]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }

    const payload = {
      full_name: data.full_name,
      email: data.email,
      phone: data.phone, // make sure you have this field in your form
      address: data.address,
      city_id_fk: data.city, // backend expects city_id_fk
      ut_id_fk: data.user_type, // backend expects ut_id_fk
      password: data.password,
    };

    try {
      setLoading(true);

      const res = await apiFetch('/add-staff', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(payload),
      });

      if (res?.status === true) {
        toast.success(res.message);
        setOpenModal(false);
        router.refresh();
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="button-relative group"
      >
        <span className="button-absolute group-hover:opacity-0">Add</span>
        <Plus
          size={18}
          className="btn-icon-absolute group-hover:opacity-100 group-hover:scale-110 group-hover:text-green-500"
        />
      </button>

      {openModal && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-xl">
            {/* Dark Header */}
            <div className="w-full border-b px-6 py-2 flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                Add New Staff
              </DialogTitle>
            </div>

            {/* Body Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <Label>Full Name</Label>
                  <Input
                    {...register('full_name', {
                      required: 'Full name is required',
                    })}
                    type="text"
                    placeholder="Enter full name"
                  />
                  {errors.full_name && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label>Email</Label>
                  <Input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Invalid email',
                      },
                    })}
                    type="email"
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <Label className="mb-2">City</Label>
                  <Select
                    value={watch('city')} //
                    onValueChange={(value) =>
                      setValue('city', value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.length > 0 ? (
                        cities.map((city) => (
                          <SelectItem
                            key={city.city_id}
                            value={city.city_id.toString()}
                          >
                            {city.city_name}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="text-gray-400 text-xs px-2">
                          No cities found
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.city && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* User Type */}
                <div>
                  <Label className="mb-2">User Type</Label>
                  <Select
                    value={watch('user_type')} //
                    onValueChange={(value) =>
                      setValue('user_type', value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypes.length > 0 ? (
                        userTypes.map((type) => (
                          <SelectItem
                            key={type.ut_id}
                            value={type.ut_id.toString()}
                          >
                            {type.ut_name}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="text-gray-400 text-xs px-2">
                          No user types found
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.user_type && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.user_type.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <Label>Address</Label>
                  <Input
                    {...register('address', {
                      required: 'Address is required',
                    })}
                    type="text"
                    placeholder="Enter address"
                    className="h-9"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label>Phone</Label>
                  <Input
                    {...register('phone', {
                      required: 'phone number is required',
                    })}
                    type="number"
                    placeholder="Enter address"
                    className="h-9"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <Label>Password</Label>
                  <Input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    type="password"
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    {...register('confirm_password', {
                      required: 'Confirm password is required',
                    })}
                    type="password"
                    placeholder="Confirm password"
                  />
                  {errors.confirm_password && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <Button disabled={loading} type="submit">
                  {loading ? 'Saving...' : 'Add Staff'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AddStaff;
