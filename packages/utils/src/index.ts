export function getName(name = '', des = '') {
  return `我是: ${name}123,${des}`;
}

const STORAGE_PREFIX = '_';
export function localStorage(key: string, value?: any) {
  if (value !== undefined) {
    window.localStorage.setItem(STORAGE_PREFIX + key, value);
    return;
  }
  return window.localStorage.getItem(STORAGE_PREFIX + key);
}
