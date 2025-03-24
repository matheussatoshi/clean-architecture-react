declare global {
  export type ParameterFunction<T> = (param: T) => void;
}

export {};
