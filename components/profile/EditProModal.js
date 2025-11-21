'use client';
import { Input } from '@/components/ui/input';
import { IMAGE_BASE_URL } from '@/lib/api';
import defaultAvatar from '@/public/default-avatar.png';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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

  // default data
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
        setImgSrc(defaultAvatar.src); // fallback if API missing image
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
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <button
            onClick={() => setIsEditing(false)}
            className="absolute right-3  "
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-semibold ">Update Profile</h2>
        </div>

        <form
          onSubmit={handleSubmit(onProfileSubmit)}
          className="space-y-4 modal-body"
        >
          <div>
            <label className="block  mb-1 text-sm sm:text-base">Name</label>
            <Input type="text" {...register('name', { required: true })} />
            {profileErrors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>
          <div>
            <label className="block  mb-1 text-sm sm:text-base">Email</label>
            <Input type="email" {...register('email', { required: true })} />
            {profileErrors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>
          <div>
            <label className="block  mb-1 text-sm sm:text-base">Phone</label>
            <Input type="text" {...register('phone', { required: true })} />
            {profileErrors.phone && (
              <p className="text-red-500 text-sm">Phone is required</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm sm:text-base">
                Profile Image
              </label>
              <input
                className="file-control form-control p-1 w-full border  rounded-md focus:outline-none focus:ring-2  transition"
                type="file"
                {...register('pro_img')}
                onChange={handleFileChange}
              />
            </div>

            {(preview || profileData?.profile_pic) && (
              <div className="flex flex-col items-center">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden border  shadow-sm">
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
            <button
              type="submit"
              className=" text-sm px-3 py-1 rounded transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
