declare global {
  type FunctionVoid = () => void;
  type ParameterFunction<T> = (param: T) => void;
}

export {};
