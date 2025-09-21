export type StoredValue = string | number | object | boolean | null;

export function saveToLocalStorage(key: string, value: StoredValue): void {
  const valueToSave = JSON.stringify(value);
  localStorage.setItem(key, valueToSave);
}

export function getFromLocalStorage<T>(key: string): T | null {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}

export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

export function clearLocalStorage(): void {
  localStorage.clear();
}
