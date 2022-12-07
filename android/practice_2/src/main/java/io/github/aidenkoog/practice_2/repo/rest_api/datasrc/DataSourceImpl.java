package io.github.aidenkoog.practice_2.repo.rest_api.datasrc;

import android.os.Bundle;

import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.rest_api.core.HttpRequest;
import io.github.aidenkoog.practice_2.repo.rest_api.datasrc.param.RestApiParam;
import io.github.aidenkoog.practice_2.repo.rest_api.datasrc.param.RestApiParamImpl;
import io.github.aidenkoog.practice_2.repo.rest_api.listener.ResultListener;

public class DataSourceImpl extends DataSource {

    private static final String PREFIX_MSG = "[REST-API-DATA-SRC]: ";
    private final HttpRequest mHttpRequest = HttpRequest.getInstance();
    private final RestApiParam mRestApiParam = new RestApiParamImpl();

    @Override
    public Bundle command(String command, Bundle params) {
        CustomLogger.i(PREFIX_MSG + "command > " + command + ", params > " + params.toString());
        return null;
    }

    @Override
    public void checkAppVersion(String os, ResultListener listener) {
        super.checkAppVersion(os, listener);
        mHttpRequest.checkAppVersion(mRestApiParam.provideAppVersionChkParams(os), listener);
    }

    @Override
    public void checkUserInfoDuplication(String userId, String mobileNum, String email,
                                         ResultListener listener) {
        super.checkUserInfoDuplication(userId, mobileNum, email, listener);
        mHttpRequest.checkUserInfoDuplication(
                mRestApiParam.provideUserInfoDuplicationChkParams(userId, mobileNum, email), listener);
    }

    @Override
    public void setAgreement(String userId, String userPw, int terms, int privacyPolicy,
                             int over14age, String authToken, ResultListener listener) {
        super.setAgreement(userId, userPw, terms, privacyPolicy, over14age, authToken, listener);
        mHttpRequest.setAgreement(mRestApiParam.provideAgreementSetParams(
                userId, userPw, terms, privacyPolicy, over14age),
                provideAuthTokenHeader(authToken), listener);
    }

    @Override
    public void signUp(String userId, String userPw, String name, String mobileNum, String email,
                       String devId, String devName, String gmt, int emailVerified, int mobileVerified,
                       ResultListener listener) {
        super.signUp(userId, userPw, name, mobileNum, email, devId, devName, gmt, emailVerified,
                mobileVerified, listener);
        mHttpRequest.signUp(mRestApiParam.provideSignUpParams(userId, userPw, name, mobileNum,
                email, devId, devName, gmt, emailVerified, mobileVerified), listener);
    }

    @Override
    public void login(String userId, String userPw, String captchaToken, String uuid,
                      String pushToken, ResultListener listener) {
        super.login(userId, userPw, captchaToken, uuid, pushToken, listener);
        mHttpRequest.login(mRestApiParam.provideLoginParams(userId, userPw, captchaToken, uuid,
                pushToken), listener);
    }

    @Override
    public void logout(String userId, String pushToken, String authToken, String refreshToken,
                       ResultListener listener) {
        super.logout(userId, pushToken, authToken, refreshToken, listener);
        mHttpRequest.logout(mRestApiParam.provideLogoutParams(
                userId, pushToken, authToken, refreshToken), provideAuthTokenHeader(authToken),
                listener);
    }

    @Override
    public void changeUserPw(String userId, String changePw, String deviceId, ResultListener listener) {
        super.changeUserPw(userId, changePw, deviceId, listener);
        mHttpRequest.changeUserPw(mRestApiParam.providePwChangeParams(userId, changePw, deviceId), listener);
    }

    @Override
    public void withdrawUser(String userId, String userPw, String authToken, String refreshToken,
                             ResultListener listener) {
        super.withdrawUser(userId, userPw, authToken, refreshToken, listener);
        mHttpRequest.withdrawUser(mRestApiParam.provideUserWithdrawalParams(userId, userPw,
                authToken, refreshToken), provideAuthTokenHeader(authToken), listener);
    }

    @Override
    public void changeUserInfo(String userId, String userPw, String name, String phoneNum,
                               String email, String changePw, int changeMobileVerified,
                               int changeEmailVerified, String authToken, String refreshToken,
                               ResultListener listener) {
        super.changeUserInfo(userId, userPw, name, phoneNum, email, changePw, changeMobileVerified,
                changeEmailVerified, authToken, refreshToken, listener);
        mHttpRequest.changeUserInfo(mRestApiParam.provideUserInfoChangeParams(userId, userPw, name,
                phoneNum, email, changePw, changeMobileVerified, changeEmailVerified, authToken,
                refreshToken), provideAuthTokenHeader(authToken), listener);
    }

    @Override
    public void findUserId(String name, String email, ResultListener listener) {
        super.findUserId(name, email, listener);
        mHttpRequest.findUserId(mRestApiParam.provideIdFindParams(name, email), listener);
    }
}