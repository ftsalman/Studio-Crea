export const env = {
  appEnv: import.meta.env.VITE_APP_ENV ?? 'development',
  siteUrl: import.meta.env.VITE_SITE_URL ?? '',
  apiUrl: import.meta.env.VITE_API_URL ?? '',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@studiocrea.com',
  isDev: import.meta.env.DEV,
}
