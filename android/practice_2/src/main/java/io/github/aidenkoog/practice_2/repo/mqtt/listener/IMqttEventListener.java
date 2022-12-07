package io.github.aidenkoog.practice_2.repo.mqtt.listener;

public interface IMqttEventListener {
    void onStatusChanged(int type);
}
