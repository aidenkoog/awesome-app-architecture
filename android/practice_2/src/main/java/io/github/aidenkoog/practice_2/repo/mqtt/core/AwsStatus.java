package io.github.aidenkoog.practice_2.repo.mqtt.core;

public class AwsStatus {
    /* topic */
    public static final int AWS_TOPIC_CONTAINS_DID = 0;
    public static final int AWS_TOPIC_CONTAINS_STATUS = 1;
    public static final int AWS_TOPIC_CONTAINS_DISCONNECTED = 2;
    public static final int AWS_TOPIC_CONTAINS_ERROR = 3;

    /* custom */
    public static final int SHOW_LOADING_DIALOG = 100;
    public static final int DISMISS_LOADING_DIALOG = 101;
}
