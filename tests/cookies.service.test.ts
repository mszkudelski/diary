import { Cookie, CookiesService } from '../src/app/helpers/cookies.service';

let instance: CookiesService;

beforeEach(() => {
  instance = new CookiesService();
});

test('should set cookie value', () => {
  const cookie: Cookie = { name: 'testCookie', value: 'testValue' };

  instance.set(cookie);

  expect(document.cookie.includes(cookie.name)).toBeTruthy();
  expect(document.cookie.includes(cookie.value)).toBeTruthy();
});

test('should set cookie expiration date', (done) => {
  const cookie: Cookie = {
    name: 'testCookie',
    value: 'testValue',
    expiration: 1000,
  };

  instance.set(cookie);

  setTimeout(() => {
    expect(document.cookie.includes(cookie.name)).toBeFalsy();
    expect(document.cookie.includes(cookie.value)).toBeFalsy();
    done();
  }, cookie.expiration);
});

test('should get cookie by name', () => {
  const cookie: Cookie = {
    name: 'testCookie',
    value: 'testValue',
    expiration: 1000,
  };

  instance.set(cookie);

  expect(instance.get(cookie.name)).toBe(cookie.value);
});

test('should get cookie including phrase', () => {
  const cookie: Cookie = {
    name: 'testCookie',
    value: 'testValue',
    expiration: 1000,
  };

  instance.set(cookie);

  expect(instance.get(cookie.name, true)).toEqual([cookie.value]);
  expect(instance.get('test', true)).toEqual([cookie.value]);
});

test('should return null if cookie does not exist', () => {
  const cookie: Cookie = {
    name: 'testCookie',
    value: 'testValue',
    expiration: 1000,
  };

  instance.set(cookie);

  expect(instance.get('asdd')).toBeNull();
});

test('should delete cookie', () => {
  const cookie: Cookie = {
    name: 'testCookie',
    value: 'testValue',
    expiration: 1000,
  };

  instance.set(cookie);

  instance.delete(cookie.name);

  expect(instance.get(cookie.name)).toBeNull();
});
