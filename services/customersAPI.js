import { apiFetch } from '@/lib/api';

export function customersAPI({ page = 1 }) {
  return apiFetch('/customers', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ page }),
  });
}
