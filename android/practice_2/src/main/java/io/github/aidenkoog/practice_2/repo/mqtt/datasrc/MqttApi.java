package io.github.aidenkoog.practice_2.repo.mqtt.datasrc;

import android.os.Bundle;

public interface MqttApi {
    Bundle command(String command, Bundle params);

    void powerOn();

    void powerOff();

    void updateVolumeLv(int volumeLv);
}
