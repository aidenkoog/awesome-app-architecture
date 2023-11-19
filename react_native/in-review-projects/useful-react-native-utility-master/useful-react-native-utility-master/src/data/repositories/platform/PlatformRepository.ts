import DeviceInfo from "react-native-device-info"

/**
 * implemented apis related to platform.
 * @return {any}
 */
const PlatformRepository = (): any => {

    /**
     * get my phone number.
     * @return {Promise}
     */
    const getMyPhoneNumber = (): Promise<string> => {
        return new Promise((fulfill, reject) => {
            DeviceInfo.getPhoneNumber().then((phoneNumber) => {
                fulfill(phoneNumber)

            }).catch((e) => reject(e))
        })
    }

    /**
     * get the application instance ID.
     * @return {Promise}
     */
    const getInstanceId = (): Promise<string> => {
        return new Promise((fulfill, reject) => {
            DeviceInfo.getInstanceId().then((instanceId) => {
                fulfill(instanceId)

            }).catch((e) => reject(e))
        })
    }

    /**
     * get the ANDROID_ID.
     * @return {Promise}
     */
    const getAndroidId = (): Promise<string> => {
        return new Promise((fulfill, reject) => {
            DeviceInfo.getAndroidId().then((androidId) => {
                fulfill(androidId)

            }).catch((e) => reject(e))
        })
    }

    /**
     * get the device unique ID. 
     * On Android it is currently identical to getAndroidId() in this module. 
     * On iOS it uses the DeviceUID uid identifier. 
     * @return {Promise}
     */
    const getUniqueId = (): Promise<string> => {
        return new Promise((fulfill, reject) => {
            DeviceInfo.getUniqueId().then((uniqueId) => {
                fulfill(uniqueId)

            }).catch((e) => reject(e))
        })
    }

    return {
        getMyPhoneNumber,
        getInstanceId,
        getAndroidId,
        getUniqueId
    }
}

/**
 * export platform repository object.
 */
export default PlatformRepository