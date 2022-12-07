package io.github.aidenkoog.practice_2.repo.mqtt.repos;

import android.os.Bundle;

import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.mqtt.core.MqttData;
import io.github.aidenkoog.practice_2.repo.mqtt.datasrc.MqttApi;
import io.github.aidenkoog.practice_2.repo.mqtt.datasrc.MqttDataSource;
import io.github.aidenkoog.practice_2.repo.mqtt.datasrc.MqttDataSourceImpl;
import io.github.aidenkoog.practice_2.repo.mqtt.listener.IMqttEventListener;
import io.github.aidenkoog.practice_2.repo.mqtt.listener.IOnDismissPopupListener;
import io.github.aidenkoog.practice_2.repo.mqtt.repos.base.MqttDataBaseRepo;

public class MqttDataRepo extends MqttDataBaseRepo implements MqttApi {
    private final MqttDataSource mMqttDataSource = MqttDataSourceImpl.getInstance();

    private static final class MqttDataRepoHolder {
        public static final MqttDataRepo INSTANCE = new MqttDataRepo();
    }

    public static MqttDataRepo getInstance() {
        return MqttDataRepoHolder.INSTANCE;
    }

    @Override
    protected String getSequenceId() {
        return super.getSequenceId();
    }

    @Override
    protected String getTag() {
        return MqttDataRepo.class.getSimpleName();
    }

    @Override
    protected int getPid() {
        return super.getPid();
    }

    public Bundle command(String command) {
        return command(command, null);
    }

    public void requestCurrentStatus() {
        mMqttDataSource.requestCurrentStatus();
    }

    @Override
    public Bundle command(String command, Bundle params) {
        return mMqttDataSource.command(command, params);
    }

    private MqttDataRepo() {
        CustomLogger.entry();
    }

    public void setOnMqttEventListener(IMqttEventListener listener) {
        mMqttDataSource.setOnMqttEventListener(listener);
    }

    public void setOnDismissPopupListener(IOnDismissPopupListener listener) {
        mMqttDataSource.setOnDismissPopupListener(listener);
    }

    public void disconnectMqtt() {
        mMqttDataSource.disconnectMqtt();
    }

    public void connectMqtt() {
        mMqttDataSource.connectMqtt();
    }

    public void resetMqtt() {
        mMqttDataSource.resetMqtt();
    }

    public MqttData getMqttData() {
        return mMqttDataSource.getMqttData();
    }

    public boolean isMqttResetInProgress() {
        return mMqttDataSource.isMqttResetInProgress();
    }

    @Override
    public void powerOn() {
        mMqttDataSource.powerOn();
    }

    @Override
    public void powerOff() {
        mMqttDataSource.powerOff();
    }

    @Override
    public void updateVolumeLv(int volumeLv) {
        mMqttDataSource.updateVolumeLv(volumeLv);
    }
}