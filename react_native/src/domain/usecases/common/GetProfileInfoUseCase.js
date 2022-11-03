import CommonRepository from '../../../data/repositories/common/CommonRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetProfileInfoUseCase = () => {

    const { getUserProfile } = CommonRepository()

    /**
     * get user profile information including image url, name, gender, birthday, height and weight.
     * @param {callback} onResult
     */
    executeGetProfileInfoUseCase = (onResult) => {
        logDebug(LOG_TAG, ">>> ### triggered executeGetProfileInfoUseCase")
        getUserProfile((userProfileInfo) => {
            onResult(userProfileInfo)
        })
    }
    return { executeGetProfileInfoUseCase }
}

export default GetProfileInfoUseCase