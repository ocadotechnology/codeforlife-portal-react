export const isValidAccessCode = (accessCode: string): boolean => {
  const accessCodeRegex = /^[A-Z]{2}[0-9]{3}$/;
  return accessCode.match(accessCodeRegex) !== null;
};
