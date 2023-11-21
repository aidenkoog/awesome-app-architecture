import { SOCKET_IO, SOCKET_SOURCE, SOCKJS } from "../../config/Configs"
import SocketIoManager from "../sources/SocketIoManager"
import SockJsManager from "../sources/SockJsManager"

export default function SocketRepository() {

  const {
    subscribeSocketIoTopic, unsubscribeSocketIoTopic, initializeSocketIo
  } = SocketIoManager()

  const {
    subscribeSockJsTopic, unsubscribeSockJsTopic, deactivateSockJs, initializeSockJs
  } = SockJsManager()

  /**
   * subscribe topic.
   * @param {string} topic 
   * @param {*} onSubscribed 
   */
  function subscribeTopic(topic, onSubscribed) {
    if (SOCKET_SOURCE === SOCKET_IO) {
      subscribeSocketIoTopic(topic, onSubscribed)
    } else {
      subscribeSockJsTopic(topic, onSubscribed)
    }
  }

  /**
   * unsubscribe topic.
   * @param {string} topic 
   */
  function unsubscribeTopic(topic) {
    if (SOCKET_SOURCE === SOCKET_IO) {
      unsubscribeSocketIoTopic(topic)
    } else {
      unsubscribeSockJsTopic(topic)
    }
  }

  /**
   * initialize socket. (SockJs)
   * @param {*} onInitialized 
   */
  function initializeSocket(onInitialized) {
    if (SOCKET_SOURCE === SOCKJS) {
      initializeSockJs(onInitialized)
    } else {
      initializeSocketIo(onInitialized)
    }
  }

  /**
   * deactivate socket. (SockJs)
   */
  function deactivateSocket() {
    if (SOCKET_SOURCE === SOCKJS) {
      deactivateSockJs()
    }
  }

  return {
    subscribeTopic,
    unsubscribeTopic,
    initializeSocket,
    deactivateSocket,
  }
}