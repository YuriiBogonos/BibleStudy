export const getUsernameFromEmail = (email: string | undefined) => {
  if (!email) {
    return "User";
  }

  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    return email.substring(0, atIndex);
  }

  return email;
};
