export interface Cookie {
  name: string;
  value: string;
  // in miliseconds
  expiration?: number;
}
export class CookiesService {
  get(name: string) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
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
