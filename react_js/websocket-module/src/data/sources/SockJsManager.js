import SockJS from 'sockjs-client'
import * as StompJS from '@stomp/stompjs'
import { SOCKET_SOURCE, SOCKJS, WEB_SOCKET_URL } from '../../config/Configs'
import { logDebug, outputErrorLog } from '../../utils/Logger'

let socketClient = null

const LOG_TAG = "SockJsManager"

const RECONNECT_DELAY = 5000
const HEART_BEAT_INCOMING = 4000
const HEART_BEAT_OUTGOING = 4000
const FRAME_COMMAND_CONNECTED = "CONNECTED"

/**
 * Combination of SockJs + StompJs.
 */
export default function SockJsManager() {

  /**
   * initialize SockJs module.
   * @param {*} onInitialized 
   */
  function initializeSockJs(onInitialized) {
    if (SOCKET_SOURCE !== SOCKJS) {
      onInitialized(false)
      return
    }
    socketClient = new StompJS.Client({
      webSocketFactory: () => {
        new SockJS(WEB_SOCKET_URL)
      },
      connectHeaders: {},
      debug: message => {
        logDebug(LOG_TAG, `debugging message: ${message}`)
      },
      reconnectDelay: RECONNECT_DELAY,
      heartbeatIncoming: HEART_BEAT_INCOMING,
      heartbeatOutgoing: HEART_BEAT_OUTGOING,
    })

    if (socketClient == null) {
      return
    }
    socketClient.onConnect = frame => {
      onInitialized(frame.command === FRAME_COMMAND_CONNECTED)
    }
    socketClient.onStompError = frame => {
      outputErrorLog(LOG_TAG, `error: ${frame}`)
    }
    socketClient.activate()
  }

  function subscribeSockJsTopic(topic, onSubscribed) {
    if (socketClient == null || SOCKET_SOURCE !== SOCKJS) {
      return
    }
    socketClient.subscribe(topic, onSubscribed)
  }

  function unsubscribeSockJsTopic(topic) {
    if (socketClient == null || SOCKET_SOURCE !== SOCKJS) {
      return
    }
    logDebug(LOG_TAG, `unsubscribe topic: ${topic}`)
  }

  function deactivateSockJs() {
    if (socketClient == null || SOCKET_SOURCE !== SOCKJS) {
      return
    }
    socketClient.deactivate()
  }


  return {
    initializeSockJs,
    subscribeSockJsTopic,
    deactivateSockJs,
    unsubscribeSockJsTopic
  }
}