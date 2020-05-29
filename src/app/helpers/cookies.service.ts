export interface Cookie {
  name: string;
  value: string;
  // in miliseconds
  expiration?: number;
}
export class CookiesService {
  get(name: string): string;
  get(name: string, partialPhrase: boolean): string[];
  get(name: string, partialPhrase = false): string | string[] {
    const rawCookies = document.cookie.split('; ');
    if (partialPhrase) {
      return rawCookies
        .map((cookie) => {
          const parts = cookie.split('=');
          return parts[0].includes(name) ? decodeURIComponent(parts[1]) : null;
        })
        .filter((cookie) => cookie !== null);
    }
    return rawCookies.reduce((result, cookie) => {
      const parts = cookie.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : result;
    }, null);
  }

  set({ name, value, expiration }: Cookie) {
    const expiresDate = new Date(
      new Date().getTime() + (expiration || 365 * 24 * 60 * 60 * 1000),
    );
    const expires = '; expires=' + expiresDate.toUTCString();
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  delete(name: string) {
    this.set({ name, value: null, expiration: -1 });
  }
}
