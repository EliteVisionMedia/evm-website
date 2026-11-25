/**
 * API client for the EVM Express + MongoDB server (see /server).
 * In development Vite proxies /api to http://localhost:5000; in production set VITE_API_URL.
 */
const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Selected services (one or more). */
  services: string[];
  /** Optional. An empty string is accepted. */
  message: string;
}

export class ApiError extends Error {
  constructor(message: string, public status: number, public fields?: Record<string, string>) {
    super(message);
  }
}

/** POST /api/contact. Resolves only when the server confirms the enquiry was saved. */
export async function submitContact(payload: ContactPayload): Promise<{ id: string }> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError('Network error. Please check your connection and try again.', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new ApiError(data.message ?? 'Something went wrong. Please try again.', res.status, data.errors);
  return data.data;
}
