function generateRandom12DigitNumber() {
  let min = 100000000000; // Minimum 12-digit number (1 followed by 11 zeros)
  let max = 999999999999; // Maximum 12-digit number (9 followed by 11 nines)

  // Generate a random number between min and max (inclusive)
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}

// Example usage:
const random12DigitNumber = generateRandom12DigitNumber();
console.log(random12DigitNumber);
