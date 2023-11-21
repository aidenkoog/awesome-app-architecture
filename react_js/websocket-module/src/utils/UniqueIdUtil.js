import { v4 as uuid } from 'uuid'
import { logDebug } from './Logger'

const LOG_TAG = "UniqueIdUtil"

export const getUniqueId = () => {
  const uniqueId = uuid()
  logDebug(LOG_TAG, `unique id: ${uniqueId}`)
  return uniqueId
}