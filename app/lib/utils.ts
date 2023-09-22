export const createTransactionReference = () => {
  const min = 1000000000000; // Smallest 13-digit number
  const max = 9999999999999; // Largest 13-digit number
  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result.toString();
};
