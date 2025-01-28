import { builder } from "@/main/factories/usecases";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const COMMAND_KEYS = Object.keys(
  builder.items,
) as (keyof typeof builder.items)[];

type InjectServiceKeys = (typeof COMMAND_KEYS)[number];

export function inject<T>(key: InjectServiceKeys): T {
  const service = builder.get(key) as T;

  if (!service) throw new Error(`Service not found: ${String(key)}`);

  return service;
}
