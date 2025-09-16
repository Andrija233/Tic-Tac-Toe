export function handleGraphqlError(err: unknown, defaultMessage: string): never {
  let errorMessage = defaultMessage;
  if (err instanceof Error) {
    errorMessage = err.message;
  } else if (typeof err === "string") {
    errorMessage = err;
  }
  throw new Error(errorMessage);
}