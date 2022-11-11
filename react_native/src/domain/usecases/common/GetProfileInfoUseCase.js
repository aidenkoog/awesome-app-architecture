import CommonRepository from '../../../data/repositories/common/CommonRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebugWithLine } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.BT_USECASE_LOG

const GetProfileInfoUseCase = () => {

    const { getUserProfile } = CommonRepository()

    /**
     * get user profile information including image url, name, gender, birthday, height and weight.
     * @param {callback} onResult
     */
    executeGetProfileInfoUseCase = (onResult) => {
        logDebugWithLine(LOG_TAG, "execute GetProfileInfoUseCase")
        getUserProfile((userProfileInfo) => {
            onResult(userProfileInfo)
        })
    }
    return { executeGetProfileInfoUseCase }
}

export default GetProfileInfoUseCase