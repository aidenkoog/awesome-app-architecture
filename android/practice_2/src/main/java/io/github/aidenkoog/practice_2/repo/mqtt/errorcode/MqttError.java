package io.github.aidenkoog.practice_2.repo.mqtt.errorcode;

public class MqttError {
    public final static int MQTT_CONNECT_ERROR = 0;        // socket connection error
    public final static int MQTT_CONNECTION_TIMEOUT = 1;   // timeout error
    public final static int MQTT_SEND_DATA_FAIL = 2;       // data send error
    public final static int MQTT_RECEIVE_DATA_FAIL = 3;    // data receive error

    public final static int MQTT_INIT_CONNECTING = 0;       // connecting
    public final static int MQTT_INIT_CONNECTED = 1;        // connected
    public final static int MQTT_INIT_CONNECTION_LOST = 2;  // connection lost
    public final static int MQTT_INIT_RECONNECTING = 3;     // re-connecting
    public final static int MQTT_INIT_DISCONNECTED = 4;     // disconnected
}
