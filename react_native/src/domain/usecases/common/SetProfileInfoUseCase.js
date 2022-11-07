import CommonRepository from '../../../data/repositories/common/CommonRepository.js'
import Constants from '../../../utils/Constants.js'
import { logDebug } from '../../../utils/logger/Logger.js'

const LOG_TAG = Constants.LOG.COMMON_USECASE_LOG

const SetProfileInfoUseCase = () => {

    const { saveUserProfile } = CommonRepository()

    /**
     * execute usecase of saving user profile.
     * @param {UserProfile} userProfileInfo
     * @param {callback} onResult
     */
    executeSetProfileInfoUseCase = (userProfileInfo, onResult) => {
        logDebug(LOG_TAG, ">>> ### triggered executeSetProfileInfoUseCase")
        saveUserProfile(userProfileInfo, onResult, (succeeded) => {
            onResult(succeeded)
        })
    }
    return { executeSetProfileInfoUseCase }
}

export default SetProfileInfoUseCase