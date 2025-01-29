import { CacheClientPort } from "../ports";

export class LocalStorageClientAdapter implements CacheClientPort {
  getItem<T = string>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem<T = string>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  get length(): number {
    return localStorage.length;
  }
}
