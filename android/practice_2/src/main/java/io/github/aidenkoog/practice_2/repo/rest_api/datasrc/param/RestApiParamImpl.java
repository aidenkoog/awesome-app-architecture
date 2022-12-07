package io.github.aidenkoog.practice_2.repo.rest_api.datasrc.param;

import android.os.Build;
import android.text.TextUtils;

import io.github.aidenkoog.practice_2.BuildConfig;
import org.json.JSONObject;
import java.util.HashMap;

public class RestApiParamImpl implements RestApiParam {

    private HashMap<String, Object> params = new HashMap<>();

    @Override
    public JSONObject provideAppVersionChkParams(String os) {
        params.put("os", os);
        return new JSONObject(params);
    }

    @Override
    public JSONObject provideUserInfoDuplicationChkParams(String userId, String mobileNum, String email) {
        params.put("userId", userId);
        params.put("mobileNum", mobileNum);
        params.put("email", email);
        return new JSONObject(params);
    }

    @Override
    public JSONObject provideAgreementSetParams(String userId, String userPw,
                                                int terms, int privacyPolicy, int over14age) {
        params.put("userId", userId);
        params.put("password", userPw);
        if (terms == 1) {
            params.put("terms", terms);
        }
        if (privacyPolicy == 1) {
            params.put("privacyPolicy", privacyPolicy);
        }
        if (over14age == 1) {
            params.put("over14age", over14age);
        }
        return new JSONObject(params);
    }

    @Override
    public JSONObject provideSignUpParams(String userId, String userPw, String name,
                                          String mobileNum, String email, String devId,
                                          String devName, String gmt, int emailVerified, int mobileVerified) {
        params.put("userId", userId);
        params.put("password", userPw);
        params.put("name", name);
        params.put("mobileNum", mobileNum);
        params.put("email", email);
        params.put("deviceId", devId);
        return new JSONObject(params);
    }

    @Override
    public JSONObject provideLoginParams(String userID, String userPw, String captchaToken,
                                         String uuid, String pushToken) {
        params.put("userId", userID);
        params.put("password", userPw);
        params.put("osVer", Build.VERSION.RELEASE);
        params.put("modelInfo", Build.MODEL);
        return new JSONObject(params);
    }

    @Override
    public JSONObject provideLogoutParams(String userId, String pushToken, String authToken,
                                          String refreshToken) {
        params.put("userId", userId);
        params.put("pushToken", pushToken);
        params.put("refreshToken", refreshToken);
        return new JSONObject(params);
    }

    @Override
    public JSONObject providePwChangeParams(String userId, String changePw, String deviceId) {
        params.put("userId", userId);
        params.put("changePassword", changePw);
        return new JSONObject(params);
    }

    @Override
    public JSONObject provideUserInfoChangeParams(String userId, String userPw, String name,
                                                  String phoneNum, String email, String changePw,
                                                  int changeMobileVerified, int changeEmailVerified,
                                                  String authToken, String refreshToken) {
        params.put("userId", userId);
        params.put("password", userPw);
        if (!TextUtils.isEmpty(name)) {
            params.put("changeName", name);
        }
        if (!TextUtils.isEmpty(phoneNum)) {
            params.put("changeMobileNum", phoneNum);
        }
        if (!TextUtils.isEmpty(email)) {
            params.put("changeEmail", email);
        }
        params.put("refreshToken", refreshToken);
        return new JSONObject(params);
    }

    @Override
    public JSONObject provideIdFindParams(String name, String email) {
        params.put("name", name);
        params.put("email", email);
        return new JSONObject(params);
    }

    @Override
    public JSONObject provideUserWithdrawalParams(String userId, String userPw, String authToken,
                                                  String refreshToken) {
        params.put("userId", userId);
        params.put("password", userPw);
        params.put("refreshToken", refreshToken);
        return new JSONObject(params);
    }
}