/**
 * Shortens a string if it exceeds a certain length.
 * If the string length is less than or equal to 30, the original string is returned.
 * If the string length is greater than 30, the string is truncated and '...' is appended.
 * @param {string} str - The string to be shortened.
 * @returns {string} The shortened string.
 */

export function shortenName(str: string) {
    if (str.length <= 30) {
        return str;
    }
    return str.slice(0, 30 - 3).trim() + '...';
}