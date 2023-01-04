
const MessageHeader = () => {

    getVersion = () => {
        return ""
    }

    getDeviceName = () => {
        return ""
    }

    getMessageId = () => {
        return ""
    }

    getSequenceId = () => {
        return ""
    }

    getStatus = () => {
        return ""
    }

    getCommand = () => {
        return ""
    }

    getRequestType = () => {
        return ""
    }

    getSourceIp = () => {
        return ""
    }

    getHeight = () => {
        return ""
    }

    getWeight = () => {
        return ""
    }

    getGender = () => {
        return ""
    }

    getAge = () => {
        return ""
    }

    getReminder = () => {
        return ""
    }

    getDate = () => {
        return ""
    }

    getFwVersion = () => {
        return ""
    }

    getPaylodLength = () => {
        return ""
    }

    /**
     * return header message.
     * [ elements needed to construct a message ]
     * 1. version.
     * 2. device name.
     * 3. message id.
     * 4. sequence id.
     * 5. status.
     * 6. command.
     * 7. request type.
     * 8. source ip.
     * 9. height.
     * 10. weight.
     * 11. gender.
     * 12. age.
     * 13. reminder.
     * 14. date.
     * 15. firmware version.
     * 16. payload's entire length.
     */
    getHeaderMessage = () => {
        return this.getVersion() + this.getDeviceName() + this.getMessageId()
            + this.getSequenceId() + this.getStatus() + this.getCommand()
            + this.getRequestType() + this.getSourceIp() + this.getHeight()
            + this.getWeight() + this.getGender() + this.getAge()
            + this.getReminder() + this.getDate() + this.getFwVersion() + this.getPayloadLength()
    }

    return {
        getHeaderMessage
    }
}

export default MessageHeader