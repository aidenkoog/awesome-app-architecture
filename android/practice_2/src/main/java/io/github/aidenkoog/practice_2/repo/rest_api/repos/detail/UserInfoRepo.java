package io.github.aidenkoog.practice_2.repo.rest_api.repos.detail;

import android.os.Bundle;
import android.text.TextUtils;

import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.rest_api.datasrc.api.UserApi;
import io.github.aidenkoog.practice_2.repo.rest_api.listener.ResultListener;
import io.github.aidenkoog.practice_2.repo.rest_api.repos.base.RestApiRepo;
import io.github.aidenkoog.practice_2.repo.rest_api.datasrc.DataSource;
import io.github.aidenkoog.practice_2.repo.rest_api.datasrc.DataSourceImpl;

import static io.github.aidenkoog.practice_2.repo.rest_api.errorcode.RestApiError.ERROR_PARAMETER_VALIDATION;

public class UserInfoRepo extends RestApiRepo implements UserApi {
    private final DataSource mServiceDataSource = new DataSourceImpl();

    @Override
    protected String getTag() {
        return UserInfoRepo.class.getSimpleName();
    }

    private static final class UserInfoRepoHolder {
        public static final UserInfoRepo INSTANCE = new UserInfoRepo();
    }

    public static UserInfoRepo getInstance() {
        return UserInfoRepoHolder.INSTANCE;
    }

    private UserInfoRepo() {
        super();
    }

    @Override
    protected String getSequenceId() {
        return super.getSequenceId();
    }

    @Override
    protected Bundle command(String command, Bundle params) {
        CustomLogger.entry();
        return mServiceDataSource.command(command, params);
    }

    @Override
    protected void notifyParamError(ResultListener listener) {
        listener.onFailure(ERROR_PARAMETER_VALIDATION);
    }

    @Override
    public void checkUserInfoDuplication(String userId, String mobileNum, String email,
                                         ResultListener listener) {
        if (!hasValidParam(OP_AND, userId, mobileNum, email)) {
            notifyParamError(listener);
            return;
        }
        mServiceDataSource.checkUserInfoDuplication(userId, mobileNum, email, listener);
    }

    @Override
    public void setAgreement(String userId, String userPw, int terms, int privacyPolicy,
                             int over14age, String authToken, ResultListener listener) {
        mServiceDataSource.setAgreement(userId, userPw, terms, privacyPolicy, over14age, authToken,
                listener);
    }

    @Override
    public void signUp(String userId, String userPw, String name, String mobileNum, String email,
                       String devId, String devName, String gmt, int emailVerified,
                       int mobileVerified, ResultListener listener) {
        if (!hasValidParam(OP_OR, userId, userPw, name, mobileNum, email, devId,
                devName, gmt)) {
            notifyParamError(listener);
            return;
        }
        mServiceDataSource.signUp(userId, userPw, name, mobileNum, email, devId, devName, gmt,
                emailVerified, mobileVerified, listener);
    }

    @Override
    public void login(String userId, String userPw, String captchaToken, String uuid,
                      String pushToken, ResultListener listener) {
        if (!hasValidParam(OP_OR, userId, userPw)) {
            notifyParamError(listener);
            return;
        }
        mServiceDataSource.login(userId, userPw, captchaToken, uuid, pushToken, listener);
    }

    @Override
    public void logout(String userId, String pushToken, String authToken, String refreshToken,
                       ResultListener listener) {
        if (!hasValidParam(OP_OR, userId)) {
            notifyParamError(listener);
            return;
        }
        mServiceDataSource.logout(userId, pushToken, authToken, refreshToken, listener);
    }

    @Override
    public void withdrawUser(String userId, String userPw, String authToken, String refreshToken,
                             ResultListener listener) {
        if (!hasValidParam(OP_OR, userId, userPw)) {
            notifyParamError(listener);
            return;
        }
        mServiceDataSource.withdrawUser(userId, userPw, authToken, refreshToken, listener);
    }

    @Override
    public void changeUserPw(String userId, String changePw, String deviceId, ResultListener listener) {
        if (!hasValidParam(OP_OR, userId, changePw, deviceId)) {
            notifyParamError(listener);
            return;
        }
        mServiceDataSource.changeUserPw(userId, changePw, deviceId, listener);
    }

    @Override
    public void changeUserInfo(String userId, String userPw, String name, String phoneNum,
                               String email, String changePw, int changeMobileVerified,
                               int changeEmailVerified, String authToken, String refreshToken,
                               ResultListener listener) {
        if (TextUtils.isEmpty(userId) || (TextUtils.isEmpty(userPw) && (TextUtils.isEmpty(name)
                && TextUtils.isEmpty(phoneNum) && TextUtils.isEmpty(email)
                && TextUtils.isEmpty(changePw)))) {
            notifyParamError(listener);
            return;
        }
        mServiceDataSource.changeUserInfo(userId, userPw, name, phoneNum, email, changePw,
                changeMobileVerified, changeEmailVerified, authToken, refreshToken, listener);
    }

    @Override
    public void findUserId(String name, String email, ResultListener listener) {
        if (!hasValidParam(OP_OR, name, email)) {
            notifyParamError(listener);
            return;
        }
        mServiceDataSource.findUserId(name, email, listener);
    }
}