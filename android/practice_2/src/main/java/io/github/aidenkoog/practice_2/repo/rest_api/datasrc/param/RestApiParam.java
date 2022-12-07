package io.github.aidenkoog.practice_2.repo.rest_api.datasrc.param;

import org.json.JSONObject;

public interface RestApiParam {
    JSONObject provideAppVersionChkParams(String os);

    JSONObject provideUserInfoDuplicationChkParams(String userId, String mobileNum, String email);

    JSONObject provideAgreementSetParams(String userId, String userPw, int terms, int privacyPolicy,
                                         int over14age);

    JSONObject provideSignUpParams(String userId, String userPw, String name,
                                   String mobileNum, String email, String devId,
                                   String devName, String gmt, int emailVerified, int mobileVerified);

    JSONObject provideLoginParams(String userID, String userPw, String captchaToken,
                                  String uuid, String pushToken);

    JSONObject provideLogoutParams(String userId, String pushToken, String authToken,
                                   String refreshToken);

    JSONObject providePwChangeParams(String userId, String changePw, String deviceId);

    JSONObject provideUserInfoChangeParams(String userId, String userPw, String name,
                                           String phoneNum, String email, String changePw,
                                           int changeMobileVerified, int changeEmailVerified,
                                           String authToken, String refreshToken);

    JSONObject provideIdFindParams(String name, String email);

    JSONObject provideUserWithdrawalParams(String userId, String userPw, String authToken,
                                           String refreshToken);
}
