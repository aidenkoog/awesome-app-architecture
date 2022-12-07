package io.github.aidenkoog.practice_2.repo.mqtt.datasrc;

import android.os.Bundle;

import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.mqtt.core.MqttData;
import io.github.aidenkoog.practice_2.repo.mqtt.core.MqttManager;
import io.github.aidenkoog.practice_2.repo.mqtt.listener.IMqttEventListener;
import io.github.aidenkoog.practice_2.repo.mqtt.listener.IOnDismissPopupListener;

public class MqttDataSourceImpl extends MqttDataSource {

    private final MqttManager mMqttManager = MqttManager.getInstance();

    private static final class MqttDataSourceImplHolder {
        public static final MqttDataSourceImpl INSTANCE = new MqttDataSourceImpl();
    }

    public static MqttDataSourceImpl getInstance() {
        return MqttDataSourceImplHolder.INSTANCE;
    }

    private MqttDataSourceImpl() {
        CustomLogger.entry();
    }

    public MqttData getMqttData() {
        return mMqttManager.getMqttData();
    }

    @Override
    public void connectMqtt() {
        mMqttManager.connectMqtt();
    }

    @Override
    public void disconnectMqtt() {
        mMqttManager.disconnectMqtt();
    }

    @Override
    public void requestCurrentStatus() {
        mMqttManager.requestCurrentStatus();
    }

    @Override
    public Bundle command(String command, Bundle params) {
        return mMqttManager.getMqttApi().command(command, params);
    }

    @Override
    public void setOnMqttEventListener(IMqttEventListener listener) {
        mMqttManager.setOnMqttEventListener(listener);
    }

    @Override
    public void setOnDismissPopupListener(IOnDismissPopupListener listener) {
        mMqttManager.setOnDismissPopupListener(listener);
    }

    @Override
    public void resetMqtt() {
        super.resetMqtt();
        mMqttManager.resetMqtt();
    }

    @Override
    public boolean isMqttResetInProgress() {
        return mMqttManager.isMqttResetInProgress();
    }

    @Override
    public void powerOn() {
        super.powerOn();
        mMqttManager.getMqttApi().powerOn();
    }

    @Override
    public void powerOff() {
        super.powerOff();
        mMqttManager.getMqttApi().powerOff();
    }

    @Override
    public void updateVolumeLv(int volumeLv) {
        super.updateVolumeLv(volumeLv);
        mMqttManager.getMqttApi().updateVolumeLv(volumeLv);
    }
}
