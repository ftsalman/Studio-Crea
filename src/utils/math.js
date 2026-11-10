export const lerp = (a, b, t) => a + (b - a) * t
export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
export const mapRange = (v, inMin, inMax, outMin, outMax) =>
  outMin + ((clamp(v, inMin, inMax) - inMin) / (inMax - inMin)) * (outMax - outMin)
export const pad = (n, size = 2) => String(n).padStart(size, '0')
