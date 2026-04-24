export function readAuthParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash;
  const hashParams = new URLSearchParams(hash);

  return {
    get(key: string) {
      return searchParams.get(key) ?? hashParams.get(key);
    },
    hasHashToken:
      hashParams.has('access_token') ||
      hashParams.has('refresh_token') ||
      hashParams.has('token_type'),
  };
}

export function clearAuthUrl() {
  window.history.replaceState({}, document.title, window.location.pathname);
}
