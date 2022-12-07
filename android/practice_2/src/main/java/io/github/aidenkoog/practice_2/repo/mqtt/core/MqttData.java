package io.github.aidenkoog.practice_2.repo.mqtt.core;

import io.github.aidenkoog.practice_2.repo.mqtt.data.DidInfoData;
import io.github.aidenkoog.practice_2.repo.mqtt.data.StatusInfoData;
import io.github.aidenkoog.practice_2.repo.mqtt.data.UserData;

public class MqttData {
    private String phoneUuid;
    private UserData userData;
    private DidInfoData didInfoData;
    private StatusInfoData statusInfoData;

    public MqttData() {
        userData = new UserData();
        didInfoData = new DidInfoData();
        statusInfoData = new StatusInfoData();
    }

    public String getPhoneUuid() {
        return phoneUuid;
    }

    public UserData getUserData() {
        return userData;
    }

    public DidInfoData getDidInfoData() {
        return didInfoData;
    }

    public void setDidInfoData(DidInfoData didInfoData) {
        this.didInfoData = didInfoData;
    }

    public StatusInfoData getStatusInfoData() {
        return statusInfoData;
    }

    public void setStatusInfoData(StatusInfoData statusInfoData) {
        this.statusInfoData = statusInfoData;
    }

    @Override
    public String toString() {
        return "MqttData{" +
                "phoneUuid='" + phoneUuid + '\'' +
                ", userData=" + userData +
                ", didInfoData=" + didInfoData +
                ", statusInfoData=" + statusInfoData +
                '}';
    }
}
