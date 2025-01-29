import {
  CacheClearError,
  CacheReadError,
  CacheRemoveError,
  CacheWriteError,
} from "@/validation/errors/cache";
import { CacheClientPort } from "../ports";

export class LocalStorageClientAdapter implements CacheClientPort {
  getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) return null;
      return JSON.parse(serializedValue) as T;
    } catch (_) {
      throw new CacheReadError(key, "Erro ao ler item do cache");
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (_) {
      throw new CacheWriteError(key, "Erro ao salvar item no cache");
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (_) {
      throw new CacheRemoveError(key, "Erro ao remover item do cache");
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (_) {
      throw new CacheClearError("Erro ao limpar o cache");
    }
  }

  key(index: number): string | null {
    try {
      return localStorage.key(index);
    } catch (_) {
      throw new CacheReadError("Erro ao acessar a chave do cache");
    }
  }

  get length(): number {
    try {
      return localStorage.length;
    } catch (_) {
      throw new CacheReadError("Erro ao acessar o comprimento do cache");
    }
  }
}
