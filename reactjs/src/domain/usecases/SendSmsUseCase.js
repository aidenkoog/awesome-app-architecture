import RemoteRepository from "../../data/repositories/RemoteRepository"

function SendSmsUseCase() {

    const { sendSms } = RemoteRepository()

    /**
     * execute usecase of asking device to send sms message.
     * @param {String} deviceMobileNumber 
     * @returns {Promise}
     */
    function executeSendSmsUseCase(deviceMobileNumber) {
        return new Promise((fulfill, reject) => {
            sendSms(deviceMobileNumber).then((response) => {
                fulfill(response)

            }).catch((e) => {
                reject(e)
            })
        })
    }

    return {
        executeSendSmsUseCase
    }
}

export default SendSmsUseCase