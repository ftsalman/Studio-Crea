import { env } from '@config/env'

/** Minimal fetch wrapper. Throws on non-2xx with the server message when available. */
export async function api(path, { method = 'GET', body, headers, ...rest } = {}) {
  const res = await fetch(`${env.apiUrl}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  })
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`)
  return data
}

/** In development (or without a backend) we simulate success so the UI can be tested. */
export const shouldMock = () => env.isDev || !env.apiUrl

export const wait = (ms) => new Promise((r) => setTimeout(r, ms))
