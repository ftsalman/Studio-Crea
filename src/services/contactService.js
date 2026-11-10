import { api, shouldMock, wait } from './api'

/** payload: { name, email, company, message, interests: string[], budget } */
export async function sendContact(payload) {
  if (shouldMock()) {
    await wait(1100)
    return { ok: true }
  }
  return api('/contact', { method: 'POST', body: payload })
}
