package io.github.aidenkoog.practice_2.repo.rest_api.core;

import static io.github.aidenkoog.practice_2.repo.rest_api.errorcode.RestApiError.ERROR_AUTH_VALIDATION;
import static io.github.aidenkoog.practice_2.util.Utils.getPhoneUuid;

import android.os.Build;
import android.os.Bundle;

import io.github.aidenkoog.practice_2.BuildConfig;
import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.mqtt.core.MqttData;
import io.github.aidenkoog.practice_2.repo.mqtt.core.MqttManager;
import io.github.aidenkoog.practice_2.repo.mqtt.data.UserData;
import io.github.aidenkoog.practice_2.repo.rest_api.core.api.HttpApi;
import io.github.aidenkoog.practice_2.repo.rest_api.errorcode.RestApiError;
import io.github.aidenkoog.practice_2.repo.rest_api.listener.CustomResultListenerImpl;
import io.github.aidenkoog.practice_2.repo.rest_api.listener.ResultListener;
import io.github.aidenkoog.practice_2.repo.shard_pref.core.PrefUtil;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

import io.paperdb.Paper;


public class HttpRequest extends HttpApi {
    private static final String PREFIX_MSG = "[HTTP-REQUEST]: ";

    private static class HttpRequestHolder {
        public static final HttpRequest INSTANCE = new HttpRequest();
    }

    public static HttpRequest getInstance() {
        return HttpRequestHolder.INSTANCE;
    }

    private static HttpRequestImpl mHttpRequestImpl = new HttpRequestImpl();
    private CustomResultListenerImpl mListenerImpl = new CustomResultListenerImpl();

    private CustomResultListenerImpl.OnRetryAuthListener mOnRetryAuthListener
            = (url, params, listener) -> {
        CustomLogger.entry();
        retryWithNewAuthToken(url, params, listener);
    };

    public void command(String command, Bundle params) {
        CustomLogger.i(PREFIX_MSG + "command > " + command + ", params > " + params.toString());
    }

    public void checkAppVersion(JSONObject params, ResultListener callback) {
        mHttpRequestImpl.postJson(URL_CHECK_APP_VERSION, params, callback);
    }

    public void checkUserInfoDuplication(JSONObject params, ResultListener listener) {
        mHttpRequestImpl.postJson(URL_CHECK_USER_INFO_DUPLICATION, params, listener);
    }

    public void setAgreement(JSONObject params, HashMap<String, String> headers,
                             ResultListener listener) {
        mHttpRequestImpl.postJson(URL_SET_AGREEMENT, params, headers, listener);
    }

    public void signUp(JSONObject params, ResultListener listener) {
        mHttpRequestImpl.postJson(URL_SIGN_UP, params, listener);
    }

    public void login(JSONObject params, ResultListener listener) {
        mHttpRequestImpl.postJson(URL_LOGIN, params, listener);
    }

    public void logout(JSONObject params, HashMap<String, String> headers,
                       ResultListener listener) {
        mListenerImpl.addParams(params).addUrl(URL_LOGOUT).addOnResultListener(listener)
                .addOnRetryAuthListener(mOnRetryAuthListener);
        mHttpRequestImpl.postJsonExecute(URL_LOGOUT, params, headers, mListenerImpl);
    }

    public void changeUserPw(JSONObject params, ResultListener listener) {
        mHttpRequestImpl.postJson(URL_CHANGE_USER_PW, params, listener);
    }

    public void withdrawUser(JSONObject params, HashMap<String, String> headers,
                             ResultListener listener) {
        mListenerImpl.addParams(params).addUrl(URL_WITHDRAW_USER).addOnResultListener(listener)
                .addOnRetryAuthListener(mOnRetryAuthListener);
        mHttpRequestImpl.postJsonExecute(URL_WITHDRAW_USER, params, headers, mListenerImpl);
    }

    public void changeUserInfo(JSONObject params, HashMap<String, String> headers,
                               ResultListener listener) {
        mListenerImpl.addParams(params).addUrl(URL_USER_CHANGE_INFO).addOnResultListener(listener)
                .addOnRetryAuthListener(mOnRetryAuthListener);
        mHttpRequestImpl.postJsonExecute(URL_USER_CHANGE_INFO, params, headers, mListenerImpl);
    }

    public void findUserId(JSONObject params, ResultListener listener) {
        mHttpRequestImpl.postJson(URL_FIND_USER_ID, params, listener);
    }

    public interface OnRefreshAuthResultListener {
        void onSuccess();

        void onFailed();
    }

    public void refreshAuth(JSONObject params, OnRefreshAuthResultListener listener) {
        mHttpRequestImpl.postJson(URL_REFRESH_AUTH, params, new ResultListener() {
            @Override
            public void onFailure(int error) {
                CustomLogger.d(PREFIX_MSG + "onFailure: error => " + error);
                listener.onFailed();
            }

            @Override
            public void onResponse(String response) {
                CustomLogger.d(PREFIX_MSG + "onResponse: response => " + response);
                try {
                    JSONObject responseJson = new JSONObject(response);
                    int responseCode = responseJson.optInt("code", 0);
                    switch (responseCode) {
                        case RestApiError.RESPONSE_SUCCESS:
                            CustomLogger.d(PREFIX_MSG + "responseCode => " + responseCode);
                            if (responseJson.has("data")) {
                                JSONObject object_data = responseJson.getJSONObject("data");
                                if (object_data.has("idToken")) {
                                    MqttManager.getInstance().getMqttData().getUserData()
                                            .setIdToken(object_data.optString("idToken"));
                                }
                                if (object_data.has("accessToken")) {
                                    MqttManager.getInstance().getMqttData().getUserData()
                                            .setAccessToken(object_data.optString("accessToken"));
                                }
                                if (object_data.has("refreshToken")) {
                                    MqttManager.getInstance().getMqttData().getUserData()
                                            .setRefreshToken(object_data.optString("refreshToken"));
                                }
                                listener.onSuccess();
                            }
                            break;

                        default:
                            break;
                    }
                } catch (Exception e) {
                    CustomLogger.e(PREFIX_MSG + "ERROR exception occurs!!!, " +
                            "error => " + e.getMessage());
                }
                listener.onFailed();
            }
        });
    }

    private JSONObject createLoginParam() {
        String captchaToken = "";
        String fcmPushToken = PrefUtil.getString(PrefUtil.KEY_FCM_PUSH_TOKEN, "");
        String phoneUuidInPaper = Paper.book().read(PrefUtil.KEY_PUSH_DEVICE_ID);
        String phoneUuid = getPhoneUuid(phoneUuidInPaper);
        String userId = PrefUtil.getString(
                PrefUtil.KEY_USER_ID_BACKUP, PrefUtil.getString(PrefUtil.KEY_USER_ID, ""));
        String userPw = PrefUtil.getString(
                PrefUtil.KEY_USER_PW_BACKUP, PrefUtil.getString(PrefUtil.KEY_USER_PW, ""));
        CustomLogger.d(PREFIX_MSG + "captchaToken > " + captchaToken
                + ", fcmPushToken > " + fcmPushToken
                + ", phoneUuid in paper > " + phoneUuidInPaper
                + ", phoneUuid > " + phoneUuid
                + ", userId > " + userId
                + ", userPw > " + userPw);

        HashMap<String, Object> loginParams = new HashMap<>();
        loginParams.put("userId", userId);
        loginParams.put("password", userPw);
        loginParams.put("os", "A");
        loginParams.put("osVer", Build.VERSION.RELEASE);
        return new JSONObject(loginParams);
    }

    private void executeApi(String url, JSONObject params, ResultListener listener) {
        CustomLogger.i(PREFIX_MSG + "execute pending api!");
        HashMap<String, String> newHeader = new HashMap<String, String>() {{
            MqttData mqttData = MqttManager.getInstance().getMqttData();
            String accessToken = mqttData.getUserData().getAccessToken();
            put("Content-Type", "application/json");
            put("Authorization", accessToken);
        }};
        mHttpRequestImpl.postJson(url, params, newHeader, listener);
    }

    private void retryWithNewAuthToken(String url, JSONObject params, ResultListener listener) {
        refreshAuth(params, new OnRefreshAuthResultListener() {
            @Override
            public void onSuccess() {
                CustomLogger.d(PREFIX_MSG + "succeeded to refresh token");
                executeApi(url, params, listener);
            }

            @Override
            public void onFailed() {
                CustomLogger.e(PREFIX_MSG + "failed to refresh token. try to login manually !!!");
                HttpRequest.this.login(createLoginParam(), new ResultListener() {
                    @Override
                    public void onFailure(int error) {
                        CustomLogger.d(PREFIX_MSG + "onFailure: error => " + error);
                        listener.onFailure(ERROR_AUTH_VALIDATION);
                    }

                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject responseJson = new JSONObject(response);
                            int responseCode = responseJson.optInt("code", 0);
                            switch (responseCode) {
                                case RestApiError.RESPONSE_SUCCESS:
                                    CustomLogger.i(PREFIX_MSG + "LOGIN SUCCESS!");
                                    if (responseJson.has("data")) {
                                        if (!saveUserData(responseJson)) {
                                            listener.onFailure(ERROR_AUTH_VALIDATION);
                                            break;
                                        }
                                        saveUserData(responseJson);
                                        if (updateApiParam(params)) {
                                            executeApi(url, params, listener);
                                        }
                                    }
                                    break;
                                default:
                                    CustomLogger.e(PREFIX_MSG + "LOGIN ERROR occurs !!!");
                                    listener.onFailure(ERROR_AUTH_VALIDATION);
                            }

                        } catch (Exception e) {
                            CustomLogger.e(PREFIX_MSG + "ERROR exception occurs!!!, " +
                                    "error => " + e.getMessage());
                            listener.onFailure(ERROR_AUTH_VALIDATION);
                        }
                    }
                });
            }
        });
    }

    private UserData checkAndGetUserData() {
        MqttData mqttData = MqttManager.getInstance().getMqttData();
        if (mqttData == null) {
            CustomLogger.e(PREFIX_MSG + "mqttData is null !!!");
            return null;
        }
        UserData userData = mqttData.getUserData();
        if (userData == null) {
            CustomLogger.e(PREFIX_MSG + "userData is null !!!");
            return null;
        }
        return userData;
    }

    private boolean updateApiParam(JSONObject params) {
        UserData userData = checkAndGetUserData();
        if (userData == null) {
            CustomLogger.e(PREFIX_MSG + "userData is null !!!");
            return false;
        }
        try {
            if (params.has("accessToken")) {
                params.put("accessToken", userData.getAccessToken());
            }
            if (params.has("refreshToken")) {
                params.put("refreshToken", userData.getRefreshToken());
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    private boolean saveUserData(JSONObject object) throws JSONException {
        UserData userData = checkAndGetUserData();
        if (userData == null) {
            CustomLogger.e(PREFIX_MSG + "userData null !!!");
            return false;
        }
        JSONObject object_data = object.getJSONObject("data");
        if (object_data.has("name")) {
            userData.setUserName(object_data.getString("name"));
        }
        if (object_data.has("mobile")) {
            userData.setUserPhone(object_data.getString("mobile"));
        }
        if (object_data.has("email")) {
            userData.setEmail(object_data.getString("email"));
        }
        if (object_data.has("idToken")) {
            userData.setIdToken(object_data.optString("idToken"));
        }
        if (object_data.has("accessToken")) {
            userData.setAccessToken(object_data.optString("accessToken"));
        }
        if (object_data.has("refreshToken")) {
            userData.setRefreshToken(object_data.optString("refreshToken"));
        }
        userData.setUserId(userData.getUserId());
        userData.setUserPw(userData.getUserPw());
        CustomLogger.d(PREFIX_MSG + "userData => " + userData.toString());
        return true;
    }
}