package io.github.aidenkoog.practice_2.repo.rest_api.datasrc;

import android.os.Bundle;

import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.rest_api.datasrc.api.*;
import io.github.aidenkoog.practice_2.repo.rest_api.listener.ResultListener;

import java.util.HashMap;

public abstract class DataSource implements AppApi, UserApi {

    protected HashMap<String, String> provideAuthTokenHeader(String authToken) {
        return new HashMap<String, String>() {{
            put("Content-Type", "application/json");
            put("Authorization", authToken);
        }};
    }

    public DataSource() {
        CustomLogger.entry();
    }

    public abstract Bundle command(String command, Bundle params);

    @Override
    public void checkAppVersion(String os, ResultListener listener) {
        CustomLogger.entry();
    }

    @Override
    public void checkUserInfoDuplication(String userId, String mobileNum, String email,
                                         ResultListener listener) {
        CustomLogger.entry();
    }

    @Override
    public void setAgreement(String userId, String userPw, int terms, int privacyPolicy,
                             int over14age, String authToken, ResultListener listener) {
        CustomLogger.entry();
    }

    @Override
    public void signUp(String userId, String userPw, String name, String mobileNum, String email,
                       String devId, String devName, String gmt, int emailVerified, int mobileVerified,
                       ResultListener listener) {
        CustomLogger.entry();
    }

    @Override
    public void login(String userId, String userPw, String captchaToken, String uuid,
                      String pushToken, ResultListener listener) {
        CustomLogger.entry();
    }

    @Override
    public void logout(String userId, String pushToken, String authToken, String refreshToken,
                       ResultListener listener) {
        CustomLogger.entry();
    }

    @Override
    public void withdrawUser(String userId, String userPw, String authToken, String refreshToken,
                             ResultListener listener) {
        CustomLogger.entry();
    }

    @Override
    public void changeUserPw(String userId, String changePw, String deviceId, ResultListener listener) {
        CustomLogger.entry();
    }
}