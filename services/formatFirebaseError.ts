export const formatFirebaseErrorMessage = (errorCode: string) => {
  const messageStartIndex = errorCode.indexOf("]") + 1;
  const message = errorCode.slice(messageStartIndex).trim();

  return message || "Something went wrong. Try again later!";
};
