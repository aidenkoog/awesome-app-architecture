
/**
 * check if the data is valid.
 * @param {string} data 
 * @returns 
 */
export const isValid = (data) => {
    if (data == null || data == "" || data == "undefined") {
        return false
    }
    return true
}