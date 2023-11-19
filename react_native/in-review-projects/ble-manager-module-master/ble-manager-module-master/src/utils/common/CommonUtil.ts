
/**
 * check if the data is valid.
 * @param {string} data 
 * @return 
 */
export const isValid = (data: string) => {
    if (data == null || data == "" || data == "undefined") {
        return false
    }
    return true
}

/**
 * get only number element.
 * @param {number} number 
 * @return 
 */
export const getOnlyNumber = (number: number) => {
    return number.toString().replace(/[^0-9]/g, '');
}

/**
 * if text is '  ', return true
 * under construction..
 * @param {string} text 
 * @return 
 */
export const emptyField = (text: string) => {
    if (text == undefined) {
        return text
    }
    return !text.trim()
}

/**
 * replace all strings.
 * @param {string} rawString 
 * @param {string} search 
 * @param {string} replace 
 * @return 
 */
export const replaceAll = (rawString: string, search: string, replace: string) => {
    return rawString.split(search).join(replace)
}