import { connect } from 'socket.io-client'
import { SOCKET_IO, SOCKET_SOURCE, WEB_SOCKET_URL } from '../../config/Configs'
import { logDebug } from '../../utils/Logger'

const LOG_TAG = "SocketIoManager"

/**
 * socket events.
 */
const EVENT_ERROR = 'error'
const EVENT_CONNECT_ERROR = 'connect-error'
const EVENT_CONNECT = 'connect'
const EVENT_DISCONNECT = 'disconnect'
const EVENT_RECONNECT_ERROR = 'reconnect_error'
const EVENT_RECONNECT_FAILED = 'reconnect_failed'
const EVENT_RECONNECTION_ATTEMPTED = 'reconnection_attempted'

const socketClient = null

export default function SocketIoManager() {

  /**
   * initialize Socket.io module.
   * @param {*} onInitialized 
   */
  function initializeSocketIo(onInitialized) {
    if (SOCKET_SOURCE !== SOCKET_IO) {
      onInitialized(false)
      return
    }
    socketClient = connect(WEB_SOCKET_URL)
    if (socketClient == null || SOCKET_SOURCE !== SOCKET_IO) {
      return
    }
    onInitialized(true)
  }

  /**
   * subscribe topic.
   * @param {string} topic 
   * @param {*} onSubscribed 
   */
  function subscribeSocketIoTopic(topic, onSubscribed) {
    if (socketClient == null || SOCKET_SOURCE !== SOCKET_IO) {
      return
    }
    socketClient.on(topic, onSubscribed)
  }

  /**
   * unsubscribe topic.
   * @param {string} topic 
   */
  function unsubscribeSocketIoTopic(topic) {
    if (socketClient == null || SOCKET_SOURCE !== SOCKET_IO) {
      return
    }
    socketClient.off(topic)
  }

  /**
   * add event listener.
   * @param {*} eventListener 
   */
  function addEventListener(eventListener) {
    if (socketClient == null || SOCKET_SOURCE !== SOCKET_IO) {
      return
    }
    socketClient.on(EVENT_ERROR, function (error) {
      logDebug(LOG_TAG, `${EVENT_ERROR}: ${error}`)
      eventListener(EVENT_ERROR, error)
    })

    socketClient.on(EVENT_CONNECT_ERROR, function (error) {
      logDebug(LOG_TAG, `${EVENT_CONNECT_ERROR}: ${error}`)
      eventListener(EVENT_CONNECT_ERROR, error)
    })

    socketClient.on(EVENT_CONNECT, function () {
      logDebug(LOG_TAG, `${EVENT_CONNECT}:`)
      eventListener(EVENT_CONNECT, null)
    })

    socketClient.on(EVENT_DISCONNECT, function (reason) {
      logDebug(LOG_TAG, `${EVENT_DISCONNECT}: ${reason}`)
      eventListener(EVENT_DISCONNECT, reason)
    })

    socketClient.on(EVENT_RECONNECT_ERROR, function (error) {
      logDebug(LOG_TAG, `${EVENT_RECONNECT_ERROR}: ${error}`)
      eventListener(EVENT_RECONNECT_ERROR, error)
    })

    socketClient.on(EVENT_RECONNECT_FAILED, function () {
      logDebug(LOG_TAG, `${EVENT_RECONNECT_FAILED}:`)
      eventListener(EVENT_RECONNECT_FAILED, null)
    })

    socketClient.on(EVENT_RECONNECTION_ATTEMPTED, () => {
      logDebug(LOG_TAG, `${EVENT_RECONNECTION_ATTEMPTED}:`)
      eventListener(EVENT_RECONNECTION_ATTEMPTED, null)
    })
  }

  return {
    subscribeSocketIoTopic,
    unsubscribeSocketIoTopic,
    initializeSocketIo,
    addEventListener
  }
}