import { ZodError } from "zod";
import { NamedError } from "./error";

export interface Success<T> {
  success: true;
  data: T;
}

export interface Failure<E extends NamedError | ZodError> {
  success: false;
  error: E;
}


export type Result<T, E extends NamedError | ZodError> = E[] extends never[]
  ? Success<T>
  : Success<T> | Failure<E>;

  export const createSuccess = <T>(data: T): Success<T> => ({
    success: true,
    data,
  });
  
  export const createFailure = <E extends NamedError | ZodError>(error: E): Failure<E> => ({
    success: false,
    error,
  });
  