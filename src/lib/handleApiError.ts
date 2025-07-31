export const handleApiError = (
  error: unknown,
  context: string = "API"
): Error => {
  if (error instanceof Error) {
    console.error(`${context} error:`, error);
    return error;
  }

  const unknownError = new Error(`An unknown error occurred: ${String(error)}`);
  console.error(`${context} unknown error:`, error);
  return unknownError;
};
