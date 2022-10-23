import Constants from '../../../utils/Constants.js'
import { logDebug, logError } from '../../../utils/Logger.js'

const bluetoothRepository = require('../../../data/repositories/BluetoothRepository.js').default
const LOG_TAG = Constants.LOG.BT_USECASE_LOG

class GetUuidListUseCase {

    /**
     * Execute the use case of getting uuid list. 
     * @param {Any} peripheral 
     * @returns {Any}
     */
    execute(peripheral) {
        const uuidList = bluetoothRepository.getUuidList(peripheral)
        logDebug(LOG_TAG, "succeeded to execute getUuidList: " + uuidList)
        return uuidList
    }
}

/**
 * export bluetooth usecase.
 */
export default new GetUuidListUseCase()