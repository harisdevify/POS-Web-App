export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export async function apiFetch(endpoint, options = {}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000';

  try {
    const isFormData = options.body instanceof FormData;

    const res = await fetch(`${baseUrl}${endpoint}`, {
      headers: isFormData
        ? options.headers || {}
        : {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
          },
      cache: 'no-store',
      ...options,
    });

    // If no content
    if (res.status === 204) return null;

    // Parse JSON automatically
    const data = await res.json().catch(() => null);

    // Handle errors
    if (!res.ok) {
      throw new Error(data?.message || `API error ${res.status}`);
    }

    // ✅ return body only
    return data;
  } catch (error) {
    // Network-level errors (server down, no internet, CORS, etc.)
    if (error instanceof TypeError) {
      throw new Error('Network error: Unable to connect to the server');
    }

    // rethrow any other error
    throw error;
  }
}
