package io.github.aidenkoog.practice_2.repo.mqtt.core;

import android.os.Bundle;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Message;

import androidx.annotation.NonNull;

import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.mqtt.data.StatusInfoData;
import io.github.aidenkoog.practice_2.repo.mqtt.datasrc.MqttApi;

public class MqttApiImpl implements MqttApi, Handler.Callback {

    public static final String MQTT_API_PREFIX_MSG = "[MQTT-API]: ";
    public static final String COMMON_API_UPDATE_STATUS = "COMMON_API_UPDATE_STATUS";

    public interface OnMqttApiExecutor {
        void onSendMqttData(StatusInfoData sendData);
    }

    private OnMqttApiExecutor mMqttApiExecutor;
    private MqttManager mMqttManager;
    private MqttData mMqttData;
    private Handler mMqttApiHandler;

    public MqttApiImpl(MqttManager manager) {
        CustomLogger.entry();
        mMqttManager = manager;
        mMqttData = manager.getMqttData();
        HandlerThread handlerThread = new HandlerThread(MqttApiImpl.class.getSimpleName());
        handlerThread.start();
        mMqttApiHandler = new Handler(handlerThread.getLooper(), this);
    }

    @Override
    public boolean handleMessage(@NonNull Message msg) {
        switch (msg.what) {
            case MSG_API_COMMON:
                sendCommandApiMqtt((Bundle) msg.obj);
                break;
            case MSG_API_POWER_ON:
                sendPowerOnMqtt();
                break;
            case MSG_API_POWER_OFF:
                sendPowerOffMqtt();
                break;
        }
        return false;
    }

    public void setOnMqttApiExecutor(OnMqttApiExecutor listener) {
        mMqttApiExecutor = listener;
    }

    private void sendMqttData(StatusInfoData sendData) {
        if (!mMqttManager.isMqttConnected()) {
            CustomLogger.e(MQTT_API_PREFIX_MSG +
                    "mqtt connection lost, retry to connect mqtt & send mqtt api!!!");
            mMqttManager.resetMqtt(sendData);
        } else {
            mMqttApiExecutor.onSendMqttData(sendData);
        }
    }

    private void sendPowerOnMqtt() {
        StatusInfoData sendData = createDataToSend("power");
        if (sendData == null) {
            CustomLogger.e(MQTT_API_PREFIX_MSG + "sendData is null !!!");
            return;
        }
        CustomLogger.d(MQTT_API_PREFIX_MSG +
                "sendData api param (powerOn:power) => " + sendData.toString());
        sendMqttData(sendData);
    }

    private void sendPowerOffMqtt() {
        StatusInfoData sendData = createDataToSend("power");
        if (sendData == null) {
            CustomLogger.e(MQTT_API_PREFIX_MSG + "sendData is null !!!");
            return;
        }
        CustomLogger.d(MQTT_API_PREFIX_MSG +
                "sendData api param (powerOff:power) => " + sendData.toString());
        sendMqttData(sendData);
    }

    @Override
    public void powerOn() {
        mMqttApiHandler.sendMessage(mMqttApiHandler.obtainMessage(MSG_API_POWER_ON));
    }

    @Override
    public void powerOff() {
        mMqttApiHandler.sendMessage(mMqttApiHandler.obtainMessage(MSG_API_POWER_OFF));
    }

    @Override
    public void updateVolumeLv(int volumeLv) {
        Bundle params = new Bundle();
        params.putInt(KEY_VOLUME_LEVEL, volumeLv);
        mMqttApiHandler.sendMessage(mMqttApiHandler.obtainMessage(MSG_API_UPDATE_VOLUME_LEVEL, params));
    }

    public Bundle command(String command, Bundle params) {
        params.putString(KEY_COMMON_API, command);
        mMqttApiHandler.sendMessage(mMqttApiHandler.obtainMessage(MSG_API_COMMON, params));
        return null;
    }

    private StatusInfoData createDataToSend(String mqttSuffix) {
        StatusInfoData data;
        try {
            data = (StatusInfoData) mMqttData.getStatusInfoData().clone();
            if (data == null) {
                CustomLogger.e(MQTT_API_PREFIX_MSG + "StatusInfoData is null !!!");
                return null;
            }
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            CustomLogger.e(MQTT_API_PREFIX_MSG + "error occurs when cloning StatusInfoData obj !!!");
            return null;
        }
        return data;
    }

    private void sendCommandApiMqtt(Bundle params) {
        String command = params.getString(KEY_COMMON_API);
        switch (command) {
            case COMMON_API_UPDATE_STATUS:
                StatusInfoData sendData = createDataToSend("UNKNOWN");
                if (sendData == null) {
                    CustomLogger.e(MQTT_API_PREFIX_MSG + "sendData is null !!!");
                    break;
                }
                CustomLogger.e(MQTT_API_PREFIX_MSG + "call UNKNOWN mqtt api");
                mMqttApiExecutor.onSendMqttData(sendData);
                break;
        }
    }

    private static final String KEY_COMMON_API = "KEY_COMMON_API";
    private static final String KEY_VOLUME_LEVEL = "KEY_VOLUME_LEVEL";

    private static final int MSG_API_COMMON = 0x0010;
    private static final int MSG_API_POWER_ON = MSG_API_COMMON + 1;
    private static final int MSG_API_POWER_OFF = MSG_API_POWER_ON + 1;
    private static final int MSG_API_UPDATE_VOLUME_LEVEL = MSG_API_POWER_OFF + 1;
}
