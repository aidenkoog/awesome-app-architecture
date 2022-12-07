package io.github.aidenkoog.practice_2.repo.rest_api.datasrc.api;

import io.github.aidenkoog.practice_2.repo.rest_api.listener.ResultListener;

public interface UserApi {
    void checkUserInfoDuplication(String userId, String mobileNum, String email,
                                  ResultListener listener);

    void setAgreement(String userId, String userPw,
                      int terms, int privacyPolicy, int over14age, String authToken,
                      ResultListener listener);

    void signUp(String userId, String userPw, String name, String mobileNum,
                String email, String devId, String devName, String gmt, int emailVerified,
                int mobileVerified, ResultListener listener);

    void login(String userId, String userPw, String captchaToken, String uuid, String pushToken,
               ResultListener listener);

    void logout(String userId, String pushToken, String authToken, String refreshToken,
                ResultListener listener);

    void withdrawUser(String userId, String userPw, String authToken, String refreshToken,
                      ResultListener listener);

    void changeUserPw(String userId, String changePw, String deviceId, ResultListener listener);

    void changeUserInfo(String userId, String userPw, String name, String phoneNum,
                        String email, String changePw, int changeMobileVerified,
                        int changeEmailVerified, String authToken, String refreshToken,
                        ResultListener listener);

    void findUserId(String name, String email, ResultListener listener);
}
