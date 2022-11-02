
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
 * replace all strings.
 * @param {string} rawString 
 * @param {string} search 
 * @param {string} replace 
 * @returns 
 */
export const replaceAll = (rawString, search, replace) => {
    return rawString.split(search).join(replace)
}

/**
 * execute arraycopy.
 * @param {Array} source 
 * @param {number} sourcePosition 
 * @param {Array} destination 
 * @param {number} destinationPosition 
 * @param {number} length 
 * @returns {Array}
 */
export const arrayCopy = (source, sourcePosition, destination, destinationPosition, length) => {
    return source.slice(sourcePosition, sourcePosition + length)
        .forEach((e, i) => destination[destinationPosition + i] = e)
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