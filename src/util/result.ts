import { NamedError } from "./error";

export interface Success<T> {
  success: true;
  data: T;
}

export interface Failure<E extends NamedError> {
  success: false;
  error: E;
}


export type Result<T, E extends NamedError> = E[] extends never[]
  ? Success<T>
  : Success<T> | Failure<E>;

  export const createSuccess = <T>(data: T): Success<T> => ({
    success: true,
    data,
  });