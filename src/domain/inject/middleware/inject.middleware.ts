import type { InjectServiceKeys } from "../domain/inject.domain";
import { container } from "../usecases/inject.services";

export function inject<T>(key: InjectServiceKeys): T {
  const service = container.get(key) as T;

  if (!service) {
    throw new Error(`Service not found: ${String(key)}`);
  }

  return service;
}
