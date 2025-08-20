export const API_BASE_URL = 'https://dev-api.storyjourney.net';
export const API_PREFIX = '/api/openapi/v1/client';
export const DEFAULT_USER_ID = (import.meta as any)?.env?.VITE_USER_ID_KEY ?? 'guest';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, unknown>;
  body?: unknown;
  signal?: AbortSignal;
}

function buildQuery(query?: Record<string, unknown>): string {
  const params = new URLSearchParams();
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      if (Array.isArray(value)) {
        for (const v of value) params.append(key, String(v));
      } else if (typeof value === 'object') {
        params.append(key, JSON.stringify(value));
      } else {
        params.append(key, String(value));
      }
    }
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export async function http<T = unknown>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, query, body, signal } = opts;

  const url = `${API_BASE_URL}${API_PREFIX}${path}${buildQuery(query)}`;

  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    signal,
  };

  if (body !== undefined) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const res = await fetch(url, init);

  if (!res.ok) {
    let errText = '';
    try {
      errText = await res.text();
    } catch {
      // ignore
    }
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${errText}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as T;
  }
  return (await res.text()) as unknown as T;
}
