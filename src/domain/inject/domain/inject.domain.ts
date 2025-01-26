import { container } from "../usecases/inject.services";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const keys = Object.keys(container.items) as (keyof typeof container.items)[];

export type InjectServiceKeys = (typeof keys)[number];
