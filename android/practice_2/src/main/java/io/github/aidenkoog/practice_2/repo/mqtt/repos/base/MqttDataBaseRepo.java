package io.github.aidenkoog.practice_2.repo.mqtt.repos.base;

import android.os.Bundle;

import io.github.aidenkoog.practice_2.logging.CustomLogger;

import java.util.Random;

public abstract class MqttDataBaseRepo {
    private static final int RANDOM_INT_BOUND = 100000000;
    private Random mRandom;

    protected abstract String getTag();

    protected int getPid() {
        return android.os.Process.myPid();
    }

    protected abstract Bundle command(String command, Bundle params);

    public MqttDataBaseRepo() {
        CustomLogger.i(getTag());
        mRandom = new Random();
    }

    protected String getSequenceId() {
        return "MQTT_SEQ" + mRandom.nextInt(RANDOM_INT_BOUND);
    }

    public abstract void connectMqtt();
}
