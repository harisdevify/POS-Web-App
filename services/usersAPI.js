import { apiFetch } from '@/lib/api';

export function usersAPI({ page = 1 }) {
  return apiFetch('/users', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ page }),
  });
}
