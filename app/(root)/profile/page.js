'use client';

import EditProModal from '@/components/profile/EditProModal';
import InfoCard from '@/components/profile/InfoCard';
import UpdatePassword from '@/components/profile/UpdatePassword';
import { apiFetch, IMAGE_BASE_URL } from '@/lib/api';
import defaultAvatar from '@/public/default-avatar.png';
// import { updateProfile } from '@/services/profileAPI';
import { Calendar, Edit, Mail, Phone, User2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [imgSrc, setImgSrc] = useState(defaultAvatar.src);

  const onProfileSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('full_name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);

      if (data.pro_img && data.pro_img[0]) {
        formData.append('profile_pic', data.pro_img[0]);
      }

      const res = await updateProfile(formData);

      if (res.status === true) {
        toast.success(res.message);
        setIsEditing(false);

        // Refresh profile data
        // const updated = await profileAPI(userId);
        if (updated?.data) {
          setProfileData(updated.data);
          if (updated.data.profile_pic) {
            setImgSrc(`${IMAGE_BASE_URL}/${updated.data.profile_pic}`);
          }
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error('Error updating profile!');
    }
  };

  const onPasswordSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New and Confirm password do not match!');
      return;
    }

    try {
      const res = await apiFetch('/profile/:user_id', {
        method: 'POST',
        cache: 'no-store',
      });
      if (res.status === true) {
        toast.success('Password changed successfully!');
        return true;
      } else {
        toast.error(res.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error changing password. Try again later.');
    }
  };

  return (
    <div className="mx-auto ">
      {/* Header */}
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className=" mt-2">Manage your account information and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview Card */}
        <div className="lg:col-span-3 space-y-8">
          {/* Profile Card */}
          <div className=" rounded-2xl shadow-sm border overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Section - Avatar & Basic Info */}
              <div className=" lg:w-1/3 p-8 flex flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  <div className="relative w-32 h-32 rounded-full p-1 shadow-lg">
                    <Image
                      src={imgSrc}
                      alt="Admin Avatar"
                      fill
                      sizes="128px"
                      className="rounded-full object-cover p-0.5"
                      onError={() => setImgSrc(defaultAvatar.src)}
                      priority
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {profileData?.full_name || 'Admin'}
                </h2>
                <p className=" text-sm mb-4">Administrator</p>

                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-3 py-2  border  rounded-lg   transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Edit size={18} />
                  Edit Profile
                </button>
              </div>

              {/* Right Section - Detailed Info */}
              <div className="w-full p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold  mb-2">
                    Personal Information
                  </h3>
                  <p className=" text-sm">
                    Your personal details and account information
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoCard
                    icon={<User2 className="w-5 h-5" />}
                    label="Full Name"
                    value={profileData?.full_name || 'Admin'}
                  />
                  <InfoCard
                    icon={<Mail className="w-5 h-5" />}
                    label="Email Address"
                    value={profileData?.email || 'admin@gmail.com'}
                  />
                  <InfoCard
                    icon={<Phone className="w-5 h-5" />}
                    label="Phone Number"
                    value={profileData?.phone || '03048994097'}
                  />
                  <InfoCard
                    icon={<Calendar className="w-5 h-5" />}
                    label="Member Since"
                    value={
                      profileData?.reg_date
                        ? profileData.reg_date
                        : '1 Jun 2000'
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <UpdatePassword onPasswordSubmit={onPasswordSubmit} />
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <EditProModal
          setIsEditing={setIsEditing}
          onProfileSubmit={onProfileSubmit}
          profileData={profileData}
        />
      )}
    </div>
  );
}
