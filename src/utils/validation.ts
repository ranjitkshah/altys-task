// Only digits, whitespace, +, -, *, /, ^, and decimal points allowed in equations.
const validEquationPattern = /^[0-9+\-*/^.\s]*$/;

export function isValidEquationInput(value: string): boolean {
  return validEquationPattern.test(value);
}

export function isValidNumberInput(value: string): boolean {
  // Allows optional minus sign, digits, and optional decimal point.
  return /^-?\d*\.?\d*$/.test(value);
}
