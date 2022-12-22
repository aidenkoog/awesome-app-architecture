import { outputErrorLog } from "../logger/Logger"

const LOG_TAG = "RegexUtil"

export const REGEX_PHONE_NUMBER = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/

/**
  * check if phone number is valid or not.
  * @param {string} watchMobileNumber 
  * @returns 
  */
export function hasValidPhoneNumber(watchMobileNumber) {
  const errorMessage = "phone number is NOT valid !!!"

  if (watchMobileNumber == null || watchMobileNumber === "" || watchMobileNumber === undefined) {
    outputErrorLog(LOG_TAG, errorMessage)
    return false
  }
  const regexResult = REGEX_PHONE_NUMBER.test(watchMobileNumber)
  if (!regexResult) {
    outputErrorLog(LOG_TAG, errorMessage)
  }
  return regexResult
}