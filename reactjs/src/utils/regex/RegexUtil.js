import { outputErrorLog } from "../logger/Logger"

const LOG_TAG = "RegexUtil"

export const REGEX_PHONE_NUMBER = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/

/**
  * Check if phone number is valid or not.
  * @param {string} deviceMobileNumber 
  * @returns 
  */
export function hasValidPhoneNumber(deviceMobileNumber) {
  const errorMessage = "phone number is NOT valid !!!"

  if (deviceMobileNumber == null || deviceMobileNumber === "" || deviceMobileNumber === undefined) {
    outputErrorLog(LOG_TAG, errorMessage)
    return false
  }
  const regexResult = REGEX_PHONE_NUMBER.test(deviceMobileNumber)
  if (!regexResult) {
    outputErrorLog(LOG_TAG, errorMessage)
  }
  return regexResult
}