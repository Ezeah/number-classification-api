/**
 * Check if a number is prime.
 * @param {number} num - The number to check.
 * @returns {boolean} - True if the number is prime, false otherwise.
 */
export function isPrime(num) {
    if (num <= 1) return false; // Correctly handle 0 and 1
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

/**
 * Check if a number is perfect.
 * @param {number} num - The number to check.
 * @returns {boolean} - True if the number is perfect, false otherwise.
 */
export function isPerfect(num) {
    if (num <= 0) return false; // Zero and negative numbers are not perfect
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

/**
 * Check if a number is an Armstrong number.
 * @param {number} num - The number to check.
 * @returns {boolean} - True if the number is an Armstrong number, false otherwise.
 */
export function isArmstrong(num) {
    if (num < 0) return false; // Negative numbers are not Armstrong numbers
    const digits = num.toString().split('');
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), power), 0);
    return sum === num;
}

/**
 * Calculate the digit sum of a number.
 * @param {number} num - The number to calculate the digit sum for.
 * @returns {number} - The digit sum of the number.
 */
export function digitSum(num) {
    return Math.abs(num).toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}