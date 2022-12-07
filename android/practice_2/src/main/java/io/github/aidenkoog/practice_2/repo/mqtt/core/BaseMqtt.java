package io.github.aidenkoog.practice_2.repo.mqtt.core;

import static io.github.aidenkoog.practice_2.repo.mqtt.core.MqttManager.MQTT_PREFIX_MSG;

import com.amazonaws.mobileconnectors.iot.AWSIotMqttManager;
import com.amazonaws.mobileconnectors.iot.AWSIotMqttQos;
import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.mqtt.listener.IMqttEventListener;

import java.util.ArrayList;

public abstract class BaseMqtt {
    protected String mqttClientId;
    protected String iotEndPoint;

    protected AWSIotMqttManager mAWSIotMqttManager;
    protected AwsMqttMessageHandler mMqttNewMessageHandler = new AwsMqttMessageHandler();
    protected IMqttEventListener mMqttEventListener;
    protected final MqttData mMqttData = new MqttData();

    protected int mMqttConnState;
    protected ArrayList<String> mTopicList = new ArrayList<>();

    public BaseMqtt() {
        CustomLogger.entry();
    }

    protected String createSubscribeTopic(String suffix, int deviceType, String deviceId) {
        return String.format("cmd/x2/%s/%s/%s/res", deviceType, deviceId.trim(), suffix.trim());
    }

    protected String createSubscribeEventTopic(String suffix, int deviceType, String deviceId) {
        return String.format("event/%s/%s/%s", deviceType, deviceId.trim(), suffix.trim());
    }

    protected String createPublishTopic(String suffix, int deviceType, String deviceId) {
        return String.format("cmd/x2/%s/%s/%s", deviceType, deviceId.trim(), suffix.trim());
    }

    public void setPublish(String postfixTopic, int deviceType, String deviceId, String request) {
        publish(createPublishTopic(postfixTopic, deviceType, deviceId), request);
    }

    protected abstract void disconnectMqtt();

    protected abstract void connectMqtt();

    protected abstract void notifyError(int nState);

    protected abstract void handleStatusChanged(int status, Throwable throwable);

    protected abstract void setPublish(String postfixTopic, int deviceType, String deviceId);

    protected abstract void setDefaultSubscribe();

    protected abstract void publish(String topic, String msg);

    protected abstract void connect();

    protected abstract void showControlScreen();

    public interface OnSubscribeResultListener {
        void onSuccess();

        void onFailed();
    }

    protected void subscribeAll(ArrayList<String> listTopic, OnSubscribeResultListener listener) {
        CustomLogger.d(MQTT_PREFIX_MSG + "SUBSCRIBE-ALL: topic = " + listTopic);
        try {
            if (listTopic.size() <= 0) {
                CustomLogger.e(MQTT_PREFIX_MSG + "topicList size <= 0 !!!");
                listener.onFailed();
                return;
            }
            mTopicList = listTopic;
            for (String topic : mTopicList) {
                mAWSIotMqttManager.subscribeToTopic(
                        topic, AWSIotMqttQos.QOS1, mMqttNewMessageHandler);
            }
            listener.onSuccess();

        } catch (Exception e) {
            e.printStackTrace();
            CustomLogger.e(MQTT_PREFIX_MSG + "exception occurs while subscribing all !!!");
            listener.onFailed();
        }
    }

    protected void unsubscribeAll() {
        try {
            for (String topic : mTopicList) {
                CustomLogger.d(MQTT_PREFIX_MSG + "UN-SUBSCRIBE: topic => " + topic);
                mAWSIotMqttManager.unsubscribeTopic(topic);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void disconnect() {
        try {
            if (mAWSIotMqttManager != null) {
                mAWSIotMqttManager.disconnect();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}