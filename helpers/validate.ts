/**
 * Validates an International Bank Account Number (IBAN) according to the ISO 13616 standard.
 * The function checks the IBAN format, verifies the length for each country, and performs a modulo 97 check.
 *
 * @param {string} iban - The IBAN string to be validated. It may include spaces.
 * @returns {boolean} - Returns `true` if the IBAN is valid, otherwise returns `false`.
 *
 * @example
 * // Valid IBAN example
 * const iban = 'GB82 WEST 1234 5698 7654 32';
 * console.log(validateIBAN(iban)); // Output: true
 *
 * @example
 * // Invalid IBAN example
 * const invalidIban = 'GB82 WEST 1234 5698 7654 33';
 * console.log(validateIBAN(invalidIban)); // Output: false
 */
export const validateIBAN = (iban: string): boolean => {
  // Remove spaces and convert to uppercase
  iban = iban.replace(/\s+/g, '').toUpperCase();

  // IBAN length mapping for different countries
  const ibanLengths = {
    AL: 28,
    AD: 24,
    AT: 20,
    AZ: 28,
    BH: 22,
    BE: 16,
    BA: 20,
    BR: 29,
    BG: 22,
    CR: 21,
    HR: 21,
    CY: 28,
    CZ: 24,
    DK: 18,
    DO: 28,
    EE: 20,
    FI: 18,
    FR: 27,
    GE: 22,
    DE: 22,
    GI: 23,
    GR: 27,
    GL: 18,
    GT: 28,
    HU: 28,
    IS: 26,
    IE: 22,
    IL: 23,
    IT: 27,
    JO: 30,
    KZ: 20,
    KW: 30,
    LV: 21,
    LB: 28,
    LI: 21,
    LT: 20,
    LU: 20,
    MK: 19,
    MT: 31,
    MR: 27,
    MU: 30,
    MC: 27,
    MD: 24,
    ME: 22,
    NL: 18,
    NO: 15,
    PK: 24,
    PS: 29,
    PL: 28,
    PT: 25,
    QA: 29,
    RO: 24,
    SM: 27,
    SA: 24,
    RS: 22,
    SK: 24,
    SI: 19,
    ES: 24,
    SE: 24,
    CH: 21,
    TN: 24,
    TR: 26,
    AE: 23,
    GB: 22,
    VG: 24,
  };

  // Extract the country code from the first two characters of the IBAN
  const countryCode = iban.slice(0, 2);

  // Validate IBAN length for the country
  if (!ibanLengths[countryCode] || iban.length !== ibanLengths[countryCode]) {
    return false;
  }

  // Rearrange IBAN by moving the first 4 characters to the end
  const rearrangedIban = iban.slice(4) + iban.slice(0, 4);

  // Convert letters to corresponding numbers: A=10, B=11, ..., Z=35
  const numericIban = rearrangedIban
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      return code >= 65 && code <= 90 ? code - 55 : char; // A=10, B=11, ..., Z=35
    })
    .join('');

  // Convert the numeric IBAN to BigInt and perform the modulo 97 check
  const ibanAsNumber = BigInt(numericIban);
  return ibanAsNumber % 97n === 1n;
};
/**
 * Validates that the name does not start with a space, contains no numbers, and has no special characters.
 *
 * @param {string} name - The name string to be validated.
 * @returns {boolean} - Returns `true` if the name is valid (no starting space, no numbers, no special characters), otherwise returns `false`.
 *
 * @example
 * validateName("John"); // true
 * validateName(" John"); // false
 * validateName("John123"); // false
 * validateName("John@Doe"); // false
 */
export const validateName = (name: string): boolean =>
  /^[^\s][a-zA-Z\s]*$/.test(name);
