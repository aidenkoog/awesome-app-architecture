import CommonRepository from '../../../data/repositories/common/CommonRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetProfileInfoUseCase = () => {

    const { getUserProfile } = CommonRepository()

    executeGetProfileInfoUseCase = () => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetProfileInfoUseCase")
        getUserProfile((userProfileInfo) => {
            return userProfileInfo
        })
    }
    return { executeGetProfileInfoUseCase }
}

export default GetProfileInfoUseCase