export type GetItemCache = <T>(key: string) => T | null;

export type SetItemCache = <T>(key: string, value: T) => void;

export type RemoveItemCache = (key: string) => void;

export type ClearCache = () => void;

export type KeyCache = (index: number) => string | null;

export type LengthCache = number;

export interface CacheClientPort {
  getItem: GetItemCache;
  setItem: SetItemCache;
  removeItem: RemoveItemCache;
  clear: ClearCache;
  key: KeyCache;
  readonly length: LengthCache;
}
