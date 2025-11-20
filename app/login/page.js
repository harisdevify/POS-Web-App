'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/public/logo.png';
import { Command, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function DemoLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [wrongAnim, setWrongAnim] = useState(false);
  const [wrongMsg, setWrongMsg] = useState('');
  const router = useRouter();
  const animTimeoutRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Toggle password (Ctrl + S)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setShowPassword((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  const triggerWrongFeedback = (message) => {
    setWrongMsg(message);
    setWrongAnim(true);

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    animTimeoutRef.current = setTimeout(() => setWrongAnim(false), 700);
  };

  // DEMO LOGIN ONLY
  const onSubmit = ({ email, password }) => {
    if (email === 'admin@demo.com' && password === '123456') {
      localStorage.setItem('demo_user', 'Demo Admin');
      toast.success('you have login.');
      router.push('/');
      return;
    } else {
      toast.error('email or password problem.');
    }

    triggerWrongFeedback('Email or password is incorrect');
  };

  return (
    <div className="flex h-dvh">
      {/* Left Section (same as your original design) */}
      <div className="bg-primary hidden lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6 text-center">
            <Image
              src={logo}
              alt="Demo Logo"
              width={80}
              height={80}
              className="mx-auto rounded-full"
              priority
            />

            <div className="space-y-2">
              <h1 className="text-primary-foreground text-3xl font-bold">
                Welcome To Bakumia POS
              </h1>
              <p className="text-primary-foreground/80 text-xl">
                Login to continue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (exact same padding, spacing, widths) */}
      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <h2 className="font-medium tracking-tight text-2xl">Bakumia POS</h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-sm">
              Use these demo login credentials
            </p>

            <p className="text-xs bg-gray-100 dark:bg-gray-100 rounded-md py-2 px-4 inline-block">
              Email: <b>admin@demo.com</b> <br />
              Password: <b>123456</b>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
                className={wrongAnim ? 'shake-input' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className={`relative ${wrongAnim ? 'shake-wrapper' : ''}`}>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className={`transition-all duration-150 ${
                    wrongAnim ? 'shake glow' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {wrongMsg && (
                <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {wrongMsg}
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-2 hidden md:flex items-center gap-1">
                Press
                <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-100 border rounded flex items-center gap-1">
                  <Command className="w-3 h-3" />
                </kbd>
                +
                <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-100 border rounded">
                  S
                </kbd>
                to show/hide password
              </p>
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full">
              {isSubmitting ? 'Checking...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
