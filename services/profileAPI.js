const { apiFetch } = require('@/lib/api');

export function profileAPI(userId) {
  return apiFetch('/admin-profile', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ user_id: userId }),
  });
}

export function updateProfile(formData) {
  return apiFetch('/update-profile', {
    method: 'POST',
    cache: 'no-store',
    body: formData,
  });
}

export function changePassword(data, userId) {
  return apiFetch('/change-password', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({
      user_id: userId,
      old_password: data.currentPassword,
      password: data.newPassword,
      confirm_password: data.confirmPassword,
    }),
  });
}
