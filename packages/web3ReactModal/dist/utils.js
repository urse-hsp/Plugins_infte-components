var STORAGE_PREFIX = '_';
export function localStorage(key, value) {
  if (value !== undefined) {
    window.localStorage.setItem(STORAGE_PREFIX + key, value);
    return;
  }
  return window.localStorage.getItem(STORAGE_PREFIX + key);
}