const { Eye, EyeOff } = require('lucide-react');
import { Input } from '@/components/ui/input';
/* Reusable PasswordInput component */
export default function PasswordInput({
  label,
  show,
  setShow,
  register,
  error,
  errorMsg,
  fullWidth,
}) {
  return (
    <div className={`relative ${fullWidth ? 'md:col-span-2' : ''}`}>
      <label className="block text-gray-600 mb-2 font-medium text-sm sm:text-base">
        {label}
      </label>
      <Input
        type={show ? 'text' : 'password'}
        placeholder={label}
        {...register}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-10 text-gray-500"
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}
