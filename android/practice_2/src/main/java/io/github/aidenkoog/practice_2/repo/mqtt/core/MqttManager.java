package io.github.aidenkoog.practice_2.repo.mqtt.core;

import static io.github.aidenkoog.practice_2.repo.mqtt.errorcode.MqttError.*;
import static io.github.aidenkoog.practice_2.repo.rest_api.core.api.HttpApi.*;

import android.os.Bundle;
import android.os.Handler;
import android.os.HandlerThread;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.internal.StaticCredentialsProvider;
import com.amazonaws.mobileconnectors.iot.AWSIotMqttClientStatusCallback.AWSIotMqttClientStatus;
import com.amazonaws.mobileconnectors.iot.AWSIotMqttManager;
import com.amazonaws.mobileconnectors.iot.AWSIotMqttQos;
import com.amazonaws.regions.Regions;
import com.google.gson.Gson;
import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.mqtt.data.*;
import io.github.aidenkoog.practice_2.repo.mqtt.datasrc.MqttApi;
import io.github.aidenkoog.practice_2.repo.mqtt.listener.*;
import io.github.aidenkoog.practice_2.util.Utils;

import java.util.ArrayList;
import java.util.Random;


public class MqttManager extends BaseMqtt {
    public static final String MQTT_PREFIX_MSG = "[MQTT]: ";
    private static final int MAX_AUTO_RECONNECT_ATTEMPTS = 2;
    private static final int RANDOM_INT_BOUND = 100000000;
    private static final int MSG_MQTT_CONNECT = 100;
    private static final int MSG_MQTT_DISCONNECT = MSG_MQTT_CONNECT + 1;
    private static final int MSG_HANDLE_CONNECTED_EVENT = MSG_MQTT_DISCONNECT + 1;
    private static final int MSG_MQTT_RESET = MSG_HANDLE_CONNECTED_EVENT + 1;
    private static final int MSG_EXECUTE_API = MSG_MQTT_RESET + 1;
    private static final int MSG_NOTIFY_STATUS_CHANGED = MSG_EXECUTE_API + 1;
    private static final int MSG_REQUEST_CURRENT_STATUS = MSG_NOTIFY_STATUS_CHANGED + 1;

    private static final String KEY_MQTT_TOPIC = "KEY_MQTT_TOPIC";
    private static final String KEY_MQTT_MESSAGE = "KEY_MQTT_MESSAGE";

    private static final String AWS_MQTT_TOPIC_DID = "did";
    private static final String AWS_MQTT_TOPIC_DISCONNECTED = "disconnected";
    private static final String AWS_MQTT_TOPIC_ERROR = "error";
    private static final String AWS_MQTT_TOPIC_STATUS = "status";

    private final MqttApi mMqttApi = new MqttApiImpl(this);

    private static final class MqttManagerHolder {
        public static final MqttManager INSTANCE = new MqttManager();
    }

    public static MqttManager getInstance() {
        return MqttManagerHolder.INSTANCE;
    }

    public MqttData getMqttData() {
        return mMqttData;
    }

    public MqttApi getMqttApi() {
        return mMqttApi;
    }

    private Handler mMqttHandler;
    private IOnDismissPopupListener mDismissPopupListener;
    private boolean mMqttConnected = false;
    private boolean mMqttReset = false;
    private StatusInfoData mPendingData = null;

    public boolean isMqttConnected() {
        return mMqttConnected;
    }

    public void requestCurrentStatus() {
        mMqttHandler.sendMessage(mMqttHandler.obtainMessage(MSG_REQUEST_CURRENT_STATUS));
    }

    private AwsMqttMessageHandler.OnAwsMqttNewMessageListener mOnAwsMqttNewMessageListener
            = (topic, message) -> {
        CustomLogger.i(MQTT_PREFIX_MSG + "topic > " + topic);

        if (topic.contains(AWS_MQTT_TOPIC_ERROR)) {
            CustomLogger.d(MQTT_PREFIX_MSG + "topic error !!!");
            onStatusChanged(AwsStatus.AWS_TOPIC_CONTAINS_ERROR);

        } else if (topic.contains(AWS_MQTT_TOPIC_DISCONNECTED)) {
            CustomLogger.d(MQTT_PREFIX_MSG + "topic disconnected !!!");
            onStatusChanged(AwsStatus.AWS_TOPIC_CONTAINS_DISCONNECTED);

        } else if (topic.contains(AWS_MQTT_TOPIC_DID)) {
            CustomLogger.d(MQTT_PREFIX_MSG + "topic did");
            if (mMqttData.getDidInfoData() == null) {
                mMqttData.setDidInfoData(new DidInfoData());
            }
            mMqttData.getDidInfoData().loadDidInfoData(topic, message);
            setPublish(AWS_MQTT_TOPIC_STATUS,
                    mMqttData.getDeviceInfoData().getDeviceType(),
                    mMqttData.getDeviceInfoData().getDeviceGid());
            onStatusChanged(AwsStatus.AWS_TOPIC_CONTAINS_DID);

        } else if (topic.contains(AWS_MQTT_TOPIC_STATUS)) {
            CustomLogger.d(MQTT_PREFIX_MSG + "topic status");
            Bundle params = new Bundle();
            params.putString(KEY_MQTT_TOPIC, topic);
            params.putString(KEY_MQTT_MESSAGE, message);
            mMqttHandler.sendMessage(mMqttHandler.obtainMessage(MSG_NOTIFY_STATUS_CHANGED, params));
        }
    };

    private void onStatusChanged(int status) {
        if (mMqttEventListener != null) {
            CustomLogger.e(MQTT_PREFIX_MSG + "call onStatusChanged!, status > " + status);
            mMqttEventListener.onStatusChanged(status);
        } else {
            CustomLogger.e(MQTT_PREFIX_MSG + "mqttEventListener is null !!!");
        }
    }

    @Override
    protected void notifyError(int nState) {
        CustomLogger.d(MQTT_PREFIX_MSG + "onError => " + nState);
        switch (nState) {
            case MQTT_RECEIVE_DATA_FAIL:    // data transition fail
            case MQTT_CONNECTION_TIMEOUT:   // socket connection timeout
            case MQTT_SEND_DATA_FAIL:       // data transition fail
            default:                        // tcp connection error
                onStatusChanged(AwsStatus.AWS_TOPIC_CONTAINS_ERROR);
        }
    }

    public void setOnDismissPopupListener(IOnDismissPopupListener listener) {
        mDismissPopupListener = listener;
    }

    @Override
    protected void showControlScreen() {
    }

    @Override
    protected void handleStatusChanged(int status, Throwable throwable) {
        CustomLogger.i(MQTT_PREFIX_MSG + "status => " + status);
        switch (status) {
            case MQTT_INIT_CONNECTED:
                CustomLogger.i(MQTT_PREFIX_MSG + "MQTT_INIT_CONNECTED!");
                mMqttConnected = true;
                mMqttReset = false;
                mMqttHandler.sendMessage(mMqttHandler.obtainMessage(MSG_HANDLE_CONNECTED_EVENT));
                break;

            case MQTT_INIT_CONNECTING:
                mMqttConnected = false;
                CustomLogger.i(MQTT_PREFIX_MSG + "MQTT_INIT_CONNECTING!");
                break;

            case MQTT_INIT_CONNECTION_LOST:
                mMqttConnected = false;
                CustomLogger.i(MQTT_PREFIX_MSG + "MQTT_INIT_CONNECTION_LOST!");
                if (mMqttReset) {
                    mMqttReset = false;
                    mMqttHandler.sendMessageDelayed(
                            mMqttHandler.obtainMessage(MSG_MQTT_CONNECT), 500);
                }
                break;

            case MQTT_INIT_RECONNECTING:
                mMqttConnected = false;
                CustomLogger.i(MQTT_PREFIX_MSG + "MQTT_INIT_RECONNECTING!");
                break;

            default:
                mMqttConnected = false;
                CustomLogger.i(MQTT_PREFIX_MSG + "MQTT_INIT_ETC!");
        }
    }

    private MqttApiImpl.OnMqttApiExecutor mMqttApiExecutor = (sendData) -> {
        mMqttHandler.sendMessage(mMqttHandler.obtainMessage(MSG_EXECUTE_API, sendData));
    };

    private MqttManager() {
        super();
        HandlerThread handlerThread = new HandlerThread(MqttManager.class.getSimpleName());
        handlerThread.start();
        mMqttHandler = new Handler(handlerThread.getLooper(), mMqttHandlerCallback);
        mMqttNewMessageHandler.setOnAwsMqttNewMessageListener(mOnAwsMqttNewMessageListener);
        ((MqttApiImpl) mMqttApi).setOnMqttApiExecutor(mMqttApiExecutor);
    }

    private Handler.Callback mMqttHandlerCallback = msg -> {
        int msgWhat = msg.what;
        CustomLogger.i(MQTT_PREFIX_MSG + "msg what => " + msgWhat);
        try {
            switch (msgWhat) {
                case MSG_MQTT_CONNECT:
                    CustomLogger.i(MQTT_PREFIX_MSG + "MSG_MQTT_CONNECT!");
                    if (!mMqttConnected) {
                        init(Utils.getPhoneUuid(mMqttData.getPhoneUuid()),
                                ...).connect();
                    }
                    break;

                case MSG_MQTT_DISCONNECT:
                    CustomLogger.i(MQTT_PREFIX_MSG + "MSG_MQTT_DISCONNECT!");
                    if (mMqttConnected) {
                        unsubscribeAll();
                        disconnect();
                    }
                    break;

                case MSG_MQTT_RESET:
                    CustomLogger.i(MQTT_PREFIX_MSG + "MSG_MQTT_RESET!");
                    mMqttReset = true;
                    if (mMqttConnected) {
                        unsubscribeAll();
                        disconnect();
                    } else {
                        mMqttHandler.sendMessage(mMqttHandler.obtainMessage(MSG_MQTT_CONNECT));
                    }
                    break;

                case MSG_HANDLE_CONNECTED_EVENT:
                    CustomLogger.i(MQTT_PREFIX_MSG + "MSG_HANDLE_CONNECTED_EVENT!");
                    DeviceInfoData devInfoData = mMqttData.getDeviceInfoData();
                    if (devInfoData == null) {
                        CustomLogger.e(MQTT_PREFIX_MSG + "deviceInfoData null !!!");
                        mPendingData = null;
                        break;
                    }
                    CustomLogger.d(MQTT_PREFIX_MSG + "devInfoData => " + devInfoData.toString());

                    if (devInfoData.getWaterDid() != null) {
                        CustomLogger.d(MQTT_PREFIX_MSG + "waterDid exists!");
                        setDefaultSubscribe();
                        mMqttData.setDidInfoData(devInfoData.getWaterDid());
                        setPublish("status",
                                devInfoData.getDeviceType(),
                                devInfoData.getDeviceGid());

                    } else {
                        CustomLogger.e(MQTT_PREFIX_MSG + "waterDid null !!!");
                        setDefaultSubscribe();
                        setPublish("did",
                                devInfoData.getDeviceType(),
                                devInfoData.getDeviceGid());
                    }
                    mDismissPopupListener.onDismiss();
                    showControlScreen();
                    if (mPendingData != null) {
                        StatusInfoData data;
                        try {
                            data = (StatusInfoData) mPendingData.clone();
                            mPendingData = null;
                            if (data == null) {
                                CustomLogger.e(MQTT_PREFIX_MSG + "StatusInfoData is null !!!");
                                break;
                            }
                        } catch (CloneNotSupportedException e) {
                            e.printStackTrace();
                            CustomLogger.e(MQTT_PREFIX_MSG +
                                    "error occurs when cloning StatusInfoData obj !!!");
                            break;
                        }
                        mMqttHandler.sendMessage(
                                mMqttHandler.obtainMessage(MSG_EXECUTE_API, data));
                    }
                    break;

                case MSG_EXECUTE_API:
                    onStatusChanged(AwsStatus.SHOW_LOADING_DIALOG);
                    StatusInfoData sendData = (StatusInfoData) msg.obj;
                    if (sendData == null) {
                        CustomLogger.e(MQTT_PREFIX_MSG + "statusInfoData is null !!!");
                        onStatusChanged(AwsStatus.DISMISS_LOADING_DIALOG);
                        break;
                    }
                    String suffix = sendData.getSuffix();
                    sendData.setDeviceID(mMqttData.getDeviceInfoData().getDeviceGid());
                    CustomLogger.d(MQTT_PREFIX_MSG + "sendData => " + sendData.toString());

                    String requestTopic = createPublishTopic(
                            suffix, mMqttData.getDeviceInfoData().getDeviceType(),
                            mMqttData.getDeviceInfoData().getDeviceGid());
                    CustomLogger.d(MQTT_PREFIX_MSG + "requestTopic => " + requestTopic);

                    PublishMessage publishMessage = new PublishMessage();
                    publishMessage.setClientID(
                            mMqttData.getDeviceInfoData().getDeviceGid())
                            .setResponseTopic("").setSessionID("")
                            .setRequestTopic(requestTopic)
                            .setRequest(sendData.getSendWiFiData1());
                    CustomLogger.d(MQTT_PREFIX_MSG + "publicMessage => " + publishMessage.toString());

                    setPublish(suffix,
                            mMqttData.getDeviceInfoData().getDeviceType(),
                            mMqttData.getDeviceInfoData().getDeviceGid(),
                            new Gson().toJson(publishMessage));
                    break;

                case MSG_NOTIFY_STATUS_CHANGED:
                    Bundle params = (Bundle) msg.obj;
                    if (!params.containsKey(KEY_MQTT_TOPIC) || !params.containsKey(KEY_MQTT_MESSAGE)) {
                        CustomLogger.e(MQTT_PREFIX_MSG + "topic or message not exist !!!");
                        break;
                    }
                    if (mMqttData.getStatusInfoData() == null) {
                        mMqttData.setStatusInfoData(new StatusInfoData());
                    }
                    StatusInfoData statusInfoData = mMqttData.getStatusInfoData();
                    statusInfoData.loadStatusInfoData(
                            params.getString(KEY_MQTT_TOPIC),
                            params.getString(KEY_MQTT_MESSAGE),
                            mMqttData.getDidInfoData());
                    CustomLogger.d(MQTT_PREFIX_MSG + "RESPONSE > " + statusInfoData.toString());
                    onStatusChanged(AwsStatus.AWS_TOPIC_CONTAINS_STATUS);
                    break;

                case MSG_REQUEST_CURRENT_STATUS:
                    devInfoData = mMqttData.getDeviceInfoData();
                    if (devInfoData == null) {
                        CustomLogger.e(MQTT_PREFIX_MSG + "deviceInfoData null !!!");
                        break;
                    }
                    setPublish("status",
                            devInfoData.getDeviceType(),
                            devInfoData.getDeviceGid());
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    };

    public MqttManager init(String clientId, String sessionToken, String accessKeyId, String secretKey) {
        Random random = new Random();
        int additionalSuffix = random.nextInt(RANDOM_INT_BOUND);
        this.mqttClientId = clientId + additionalSuffix;
        CustomLogger.e(MQTT_PREFIX_MSG +
                "mqttClientId >> " + mqttClientId +
                ", additionalSuffix >> " + additionalSuffix);
        this.iotEndPoint = IOT_ENDPOINT;

        mAWSIotMqttManager = AWSIotMqttManager.from(
                com.amazonaws.regions.Region.getRegion(Regions.US_EAST_1),
                AWSIotMqttManager.ClientId.fromString(mqttClientId),
                AWSIotMqttManager.Endpoint.fromString(iotEndPoint));
        return this;
    }

    public void setOnMqttEventListener(IMqttEventListener listener) {
        mMqttEventListener = listener;
    }

    @Override
    public void disconnectMqtt() {
        mMqttHandler.sendMessage(mMqttHandler.obtainMessage(MSG_MQTT_DISCONNECT));
    }

    @Override
    public void connectMqtt() {
        mMqttHandler.sendMessage(mMqttHandler.obtainMessage(MSG_MQTT_CONNECT));
    }

    public boolean isMqttResetInProgress() {
        return mMqttReset;
    }

    public void resetMqtt() {
        mMqttHandler.sendMessage(mMqttHandler.obtainMessage(MSG_MQTT_RESET));
    }

    public void resetMqtt(StatusInfoData pendingData) {
        mPendingData = pendingData;
        mMqttHandler.sendMessage(mMqttHandler.obtainMessage(MSG_MQTT_RESET));
    }

    @Override
    public void setPublish(String postfixTopic, int deviceType, String deviceId, String request) {
        publish(createPublishTopic(postfixTopic, deviceType, deviceId), request);
    }

    @Override
    public void setPublish(String postfixTopic, int deviceType, String deviceId) {
        if (postfixTopic != null && deviceId != null) {
            PublishMessage publishMessage = new PublishMessage();
            publishMessage.setSessionID("").setResponseTopic("").setClientID(deviceId.trim())
                    .setRequestTopic(createPublishTopic(postfixTopic, deviceType, deviceId));
            String publicMsgString = new Gson().toJson(publishMessage);
            publish(createPublishTopic(postfixTopic, deviceType, deviceId), publicMsgString);
        }
    }

    private void subscribeTopic(ArrayList<String> subscribeMessages, String topic) {
        subscribeMessages.add(createSubscribeTopic(topic,
                mMqttData.getDeviceInfoData().getDeviceType(),
                mMqttData.getDeviceInfoData().getDeviceGid()));
    }

    @Override
    public void setDefaultSubscribe() {
        ArrayList<String> subscribeMessages = new ArrayList<>();
        subscribeMessages.clear();
        subscribeTopic(subscribeMessages, "did");
        subscribeTopic(subscribeMessages, "status");
        subscribeMessages.add(createSubscribeEventTopic("disconnected",
                mMqttData.getDeviceInfoData().getDeviceType(),
                mMqttData.getDeviceInfoData().getDeviceGid()));

        CustomLogger.d(MQTT_PREFIX_MSG + "SubscribeMessages => " + subscribeMessages.toString());
        subscribeAll(subscribeMessages, new OnSubscribeResultListener() {
            @Override
            public void onSuccess() {
                CustomLogger.e(MQTT_PREFIX_MSG + "succeeded to subscribe all");
            }

            @Override
            public void onFailed() {
                CustomLogger.e(MQTT_PREFIX_MSG + "failed to subscribe all !!!");
            }
        });
    }

    @Override
    public void publish(String topic, String msg) {
        try {
            CustomLogger.d(MQTT_PREFIX_MSG + "PUBLISH: topic => " + topic + ", payload => " + msg);
            mAWSIotMqttManager.publishString(msg, topic, AWSIotMqttQos.QOS1, (status, userData) ->
                    CustomLogger.d(status.name()), null);
        } catch (Exception e) {
            CustomLogger.e(MQTT_PREFIX_MSG + "publish error " + e + " !!!");
        }
    }

    @Override
    public void connect() {
        try {
            if (mAWSIotMqttManager == null) {
                mAWSIotMqttManager = AWSIotMqttManager.from(
                        com.amazonaws.regions.Region.getRegion(Regions.US_EAST_1),
                        AWSIotMqttManager.ClientId.fromString(mqttClientId),
                        AWSIotMqttManager.Endpoint.fromString(iotEndPoint));
            }
            BasicSessionCredentials sessionCredentials
                    = new BasicSessionCredentials(accessKeyId, secretKey, sessionToken);
            AWSCredentialsProvider credentialProvider
                    = new StaticCredentialsProvider(sessionCredentials);
            mAWSIotMqttManager.setMaxAutoReconnectAttempts(MAX_AUTO_RECONNECT_ATTEMPTS);
            mAWSIotMqttManager.connect(credentialProvider, (status, throwable) -> {
                CustomLogger.d(MQTT_PREFIX_MSG + "status => " + status.toString());
                try {
                    if (status == AWSIotMqttClientStatus.Connecting) {
                        mMqttConnState = MQTT_INIT_CONNECTING;
                    } else if (status == AWSIotMqttClientStatus.Connected) {
                        mMqttConnState = MQTT_INIT_CONNECTED;
                    } else if (status == AWSIotMqttClientStatus.ConnectionLost) {
                        mMqttConnState = MQTT_INIT_CONNECTION_LOST;
                    } else if (status == AWSIotMqttClientStatus.Reconnecting) {
                        mMqttConnState = MQTT_INIT_RECONNECTING;
                    } else {
                        mMqttConnState = MQTT_INIT_DISCONNECTED;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    mMqttConnState = MQTT_INIT_DISCONNECTED;
                } finally {
                    handleStatusChanged(mMqttConnState, throwable);
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
            notifyError(MQTT_CONNECT_ERROR);
            CustomLogger.e(MQTT_PREFIX_MSG + "Connection error => " + e);
        }
    }
}