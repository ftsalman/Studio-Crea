import { api, shouldMock, wait } from './api'

export async function subscribe(email) {
  if (shouldMock()) {
    await wait(700)
    return { ok: true }
  }
  return api('/newsletter', { method: 'POST', body: { email } })
}
