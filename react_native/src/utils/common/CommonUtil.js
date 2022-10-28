
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

/**
 * under construction..
 * @param {number} number 
 * @returns 
 */
export const getOnlyNumber = (number) => {
    return number.toString().replace(/[^0-9]/g, '');
}

/**
 * if text is '  ', return true
 * under construction..
 * @param {string} text 
 * @returns 
 */
export const emptyField = (text) => {
    return !text.trim()
}

/**
 * under construction..
 */
export const imageOptions = {
    mediaType: "photo",
    maxWidth: 1024,
    maxHeight: 1024,
    quality: 0.1
};