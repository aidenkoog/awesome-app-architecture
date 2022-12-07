package io.github.aidenkoog.practice_2.repo.mqtt.core;

import static io.github.aidenkoog.practice_2.repo.mqtt.core.MqttManager.MQTT_PREFIX_MSG;

import com.amazonaws.mobileconnectors.iot.AWSIotMqttNewMessageCallback;
import io.github.aidenkoog.practice_2.logging.CustomLogger;

import java.io.UnsupportedEncodingException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class AwsMqttMessageHandler implements AWSIotMqttNewMessageCallback {
    private ExecutorService mMessageExecutor = Executors.newFixedThreadPool(1);

    public interface OnAwsMqttNewMessageListener {
        void onNewMessage(String topic, String message);
    }

    private OnAwsMqttNewMessageListener mAwsMqttNewMessageListener;

    @Override
    public void onMessageArrived(String topic, byte[] data) {
        mMessageExecutor.execute(() -> {
            String message = null;
            try {
                message = new String(data, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            CustomLogger.d(MQTT_PREFIX_MSG + "topic > " + topic + ", \n" +
                    "data > " + data + ", \nmessage > " + message);
            mAwsMqttNewMessageListener.onNewMessage(topic, message);
        });
    }

    public AwsMqttMessageHandler() {
        CustomLogger.entry();
    }

    public void setOnAwsMqttNewMessageListener(OnAwsMqttNewMessageListener listener) {
        mAwsMqttNewMessageListener = listener;
    }
}