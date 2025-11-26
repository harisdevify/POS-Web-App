'use client';

import { Input } from '@/components/ui/input';
import { IMAGE_BASE_URL } from '@/lib/api';
import defaultAvatar from '@/public/default-avatar.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

export default function EditProModal({
  setIsEditing,
  onProfileSubmit,
  profileData,
}) {
  const [preview, setPreview] = useState(null);
  const [imgSrc, setImgSrc] = useState(defaultAvatar.src);

  const {
    register,
    handleSubmit,
    formState: { errors: profileErrors },
    reset,
  } = useForm();

  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.full_name || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
      });

      if (profileData.profile_pic) {
        setImgSrc(`${IMAGE_BASE_URL}/${profileData.profile_pic}`);
      } else {
        setImgSrc(defaultAvatar.src);
      }
    }
  }, [profileData, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={true} onOpenChange={setIsEditing}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <Input type="text" {...register('name', { required: true })} />
            {profileErrors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <Input type="email" {...register('email', { required: true })} />
            {profileErrors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Phone</label>
            <Input type="text" {...register('phone', { required: true })} />
            {profileErrors.phone && (
              <p className="text-red-500 text-sm">Phone is required</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm">Profile Image</label>
              <Input
                type="file"
                {...register('pro_img')}
                onChange={handleFileChange}
                className="file-control p-1 w-full border rounded-md"
              />
            </div>

            {preview && (
              <div className="flex flex-col items-center">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border shadow-sm">
                  <Image
                    src={preview || imgSrc}
                    alt="Preview"
                    width={50}
                    height={50}
                    className="object-cover w-full h-full"
                    onError={() => setImgSrc(defaultAvatar.src)}
                  />
                </div>
                <p className="text-xs mt-1">Preview</p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
