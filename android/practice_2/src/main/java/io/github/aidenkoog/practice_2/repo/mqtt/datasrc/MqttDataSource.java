package io.github.aidenkoog.practice_2.repo.mqtt.datasrc;

import android.os.Bundle;

import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.mqtt.core.MqttData;
import io.github.aidenkoog.practice_2.repo.mqtt.listener.IMqttEventListener;
import io.github.aidenkoog.practice_2.repo.mqtt.listener.IOnDismissPopupListener;

public abstract class MqttDataSource implements MqttApi {
    public MqttDataSource() {
        CustomLogger.entry();
    }

    public abstract MqttData getMqttData();

    public abstract void connectMqtt();

    public abstract void disconnectMqtt();

    public abstract Bundle command(String command, Bundle params);

    public abstract void setOnMqttEventListener(IMqttEventListener listener);

    public abstract void setOnDismissPopupListener(IOnDismissPopupListener listener);

    public void resetMqtt() {
        CustomLogger.entry();
    }

    public abstract boolean isMqttResetInProgress();

    public abstract void requestCurrentStatus();

    @Override
    public void powerOn() {
        CustomLogger.entry();
    }

    @Override
    public void powerOff() {
        CustomLogger.entry();
    }

    @Override
    public void updateVolumeLv(int volumeLv) {
        CustomLogger.entry();
    }

}
