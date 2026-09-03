/**
 * Resolves static asset paths relative to Vite's configured BASE_URL.
 * Ensures images resolve correctly on root domains, GitHub Pages subpaths, and local dev.
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || './';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
}
