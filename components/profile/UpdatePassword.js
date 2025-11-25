'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import PasswordInput from './PasswordInput';

const UpdatePassword = ({ onPasswordSubmit }) => {
  const {
    register: registerPassword,
    handleSubmit,
    formState: { errors: passwordErrors },
    reset,
  } = useForm();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFormSubmit = async (data) => {
    const result = await onPasswordSubmit(data);
    if (result === true) reset();
  };

  return (
    <>
      {/* Password Section */}
      <div className=" w-full mt-3 sm:mt-4 sm:p-8 p-5 rounded-2xl border ">
        <h3 className="text-lg sm:text-xl font-semibold  mb-5 sm:mb-6 border-b pb-3">
          Change Password
        </h3>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Current Password */}
          <PasswordInput
            label="Current Password"
            show={showCurrent}
            setShow={setShowCurrent}
            register={registerPassword('currentPassword', { required: true })}
            error={passwordErrors.currentPassword}
            errorMsg="Current password is required"
          />

          {/* New Password */}
          <PasswordInput
            label="New Password"
            show={showNew}
            setShow={setShowNew}
            register={registerPassword('newPassword', {
              required: true,
              minLength: 6,
            })}
            error={passwordErrors.newPassword}
            errorMsg="Password must be at least 6 characters"
          />

          {/* Confirm Password */}
          <PasswordInput
            label="Confirm New Password"
            show={showConfirm}
            setShow={setShowConfirm}
            register={registerPassword('confirmPassword', { required: true })}
            error={passwordErrors.confirmPassword}
            errorMsg="Please confirm your password"
            fullWidth
          />

          {/* Buttons */}
          <div className="flex justify-end w-full md:col-span-2">
            <Button type="submit" className="cursor-pointer">
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
