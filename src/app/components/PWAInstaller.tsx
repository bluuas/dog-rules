'use client';

import { useEffect } from 'react';

export function PWAInstaller() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    // In development the worker would serve stale chunks, since dev builds do not hash file names.
    if (process.env.NODE_ENV !== 'production') return;

    const register = () => {
      navigator.serviceWorker
        // Always check the server for a new worker script instead of trusting the HTTP cache.
        .register('/sw.js', { updateViaCache: 'none' })
        .catch((error) => console.warn('Service worker registration failed:', error));
    };

    // Register after the page has loaded so the worker does not compete with it for bandwidth.
    // The load event may already be over when this effect runs; the old code waited for it forever.
    if (document.readyState === 'complete') {
      register();
      return;
    }
    window.addEventListener('load', register, { once: true });
    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}
