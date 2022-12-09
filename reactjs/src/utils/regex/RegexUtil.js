
export const REGEX_PHONE_NUMBER = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/

/**
  * check if phone number is valid or not.
  * @param {string} watchMobileNumber 
  * @returns 
  */
export function hasValidPhoneNumber(watchMobileNumber) {
    if (watchMobileNumber == null || watchMobileNumber === "" || watchMobileNumber === undefined) {
        return false
    }
    return REGEX_PHONE_NUMBER.test(watchMobileNumber)
}