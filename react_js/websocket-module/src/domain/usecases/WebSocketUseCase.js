import SocketRepository from "../../data/repositories/SocketRepository"

export default function WebSocketUseCase() {

  const {
    subscribeTopic, unsubscribeTopic, initializeSocket, deactivateSocket
  } = SocketRepository()

  /**
   * subscribe topic.
   * @param {string} topic 
   * @param {*} onMessageReceived 
   */
  function executeSubscribeTopic(topic, onMessageReceived) {
    subscribeTopic(topic, onMessageReceived)
  }

  /**
   * unsubscribe topic.
   * @param {string} topic 
   */
  function executeUnsubscribeTopic(topic) {
    unsubscribeTopic(topic)
  }

  /**
   * deactivate socket. (SockJs)
   */
  function executeDeactivateSocket() {
    deactivateSocket()
  }

  /**
   * initialize socket. (SockJs)
   * @param {*} onInitialized 
   */
  function executeInitializeSocket(onInitialized) {
    initializeSocket(onInitialized)
  }

  return {
    executeSubscribeTopic,
    executeUnsubscribeTopic,
    executeDeactivateSocket,
    executeInitializeSocket
  }
}