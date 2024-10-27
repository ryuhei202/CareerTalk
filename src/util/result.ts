export interface Success<T> {
	success: true;
	message: string;
	data: T;
}

export interface Failure<E> {
	success: false;
	message: string;
	data: E;
}

export type Result<T, E> = Success<T> | Failure<E>;

export const createSuccess = <T>({
	message,
	data,
}: {
	data: T;
	message: string;
}): Success<T> => ({
	success: true,
	message,
	data,
});

export const createFailure = <E>({
	message,
	data,
}: {
	message: string;
	data: E;
}): Failure<E> => ({
	success: false,
	message,
	data,
});
