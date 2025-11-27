import { Input } from '@/components/ui/input';

// Reusable form field component
export default function FormField({
  label,
  placeholder,
  register,
  name,
  required = false,
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <Input placeholder={placeholder} {...register(name, { required })} />
    </div>
  );
}
