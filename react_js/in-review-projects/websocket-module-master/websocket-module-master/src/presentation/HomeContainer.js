import { SOCKET_TOPIC } from "../config/Configs"
import Payload from "../domain/model/Payload"
import WebSocketUseCase from "../domain/usecases/WebSocketUseCase"
import { logDebug, logDebugWithLine } from "../utils/Logger"
import { getUniqueId } from "../utils/UniqueIdUtil"
import { HomeComponent } from "./HomeComponent"
import { useLayoutEffect, useState } from "react"

const LOG_TAG = "HomeContainer"

/**
 * home main container.
 * @returns {JSX.Element}
 */
export const HomeContainer = () => {
  /**
   * use state for ui interaction. 
   */
  const [message, setMessage] = useState(null)
  const [socketConnected, setSocketConnected] = useState(false)

  /**
   * usecases.
   */
  const {
    executeDeactivateSocket, executeInitializeSocket,
    executeSubscribeTopic, executeUnsubscribeTopic
  } = WebSocketUseCase()

  /**
   * initialize socket module before rendering and paiting ui.
   */
  useLayoutEffect(() => {
    logDebugWithLine(LOG_TAG, `socket connection: ${socketConnected}`)
    if (socketConnected) {
      return
    }
    executeInitializeSocket((socketEstablished) => {
      logDebugWithLine(LOG_TAG, `socket is established: ${socketEstablished}`)

      if (!socketEstablished) {
        setSocketConnected(false)
        return
      }
      /* try to subscribe topic if socket module is initialized successfully. */
      const uniqueId = getUniqueId()
      logDebug(LOG_TAG, `unique id: ${uniqueId}`)

      executeSubscribeTopic(SOCKET_TOPIC + uniqueId, onSubscribeMessage)
      setSocketConnected(socketEstablished)
    })
    return () => {
      executeUnsubscribeTopic(SOCKET_TOPIC)
      executeDeactivateSocket()
      setSocketConnected(false)
    }
  }, [])

  /**
   * receive messages about subscribed topic.
   * @param {any} message 
   */
  const onSubscribeMessage = (message) => {
    logDebug(LOG_TAG, "received message: " + message)
    setMessage(message)

    /* customized payload. */
    const payload = new Payload(
      message.timeStamp, message.headerMessage, message.bodyMessage
    )
    logDebug(LOG_TAG, "payload: " + payload)
  }

  return (
    <HomeComponent
      message={message}
    />
  )
}