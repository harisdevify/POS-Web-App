import { apiFetch } from '@/lib/api';

export function rolesAPI({ page = 1, user_id }) {
  return apiFetch('/get-usertype', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({
      page,
      user_id: user_id ? Number(user_id) : null,
    }),
  });
}

export function roleModuleView(userId, ut_id) {
  return apiFetch('/module-role/view', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ user_id: userId, ut_id }),
  });
}

export function roleModuleUpdate(userId, formattedRoles, rolesData, ut_id) {
  return apiFetch('/module-role/update', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({
      user_id: userId,
      ut_id,
      rolesArray: formattedRoles,
      role_name: rolesData?.role?.ut_name,
    }),
  });
}

export function roleModuleCreate(userId, formattedRoles, formData) {
  return apiFetch('/module-role/create', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({
      role_name: formData.modalRoleName,
      user_id: userId,
      rolesArray: formattedRoles,
    }),
  });
}

export function moduleGet() {
  return apiFetch('/module/get', { method: 'POST', cache: 'no-store' });
}

export function moduleUpdate(bodyData) {
  return apiFetch(`/module/update`, {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify(bodyData),
  });
}

export function moduleCreate(data) {
  return apiFetch('/module/create', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify(data),
  });
}

export function getCities() {
  return apiFetch('/get-city', { method: 'POST', cache: 'no-store' });
}

export function getUserTypes(userId) {
  return apiFetch('/get-usertype', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ user_id: userId }),
  });
}

export function addStaff(payload) {
  return apiFetch('/add-staff', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify(payload),
  });
}
