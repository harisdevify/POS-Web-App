import logo from '@/public/logo.png';
import Image from 'next/image';
export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-135px)] flex-col items-center justify-center text-center px-4">
      <div className="relative flex items-center justify-center">
        {/* Center Image */}
        <Image src={logo} alt="Logo" className="w-10 h-10 rounded-full" />

        {/* Spinner around image */}
        <div className="absolute w-15 h-15 border border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
