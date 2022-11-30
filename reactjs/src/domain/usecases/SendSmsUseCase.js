import RemoteRepository from "../../data/repositories/RemoteRepository"

function SendSmsUseCase() {

    const { sendSms } = RemoteRepository()

    function executeSendSmsUseCase(watchMobileNumber) {
        return new Promise((fulfill, reject) => {
            sendSms(watchMobileNumber).then((response) => {
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