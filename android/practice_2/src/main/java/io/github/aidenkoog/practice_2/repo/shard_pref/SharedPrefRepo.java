package io.github.aidenkoog.practice_2.repo.shard_pref;

import io.github.aidenkoog.practice_2.repo.shard_pref.core.PrefUtil;

public class SharedPrefRepo {
    public static void setUserId(String id) {
        PrefUtil.putString("", id);
    }

    public static void setUserEmail(String email) {
        PrefUtil.putString("", email);
    }

    public static void setUserName(String name) {
        PrefUtil.putString("", name);
    }

    public static void setUserPhoneNumber(String phoneNumber) {
        PrefUtil.putString("", phoneNumber);
    }

    public static void setUserPw(String pw) {
        PrefUtil.putString("", pw);
    }

    public static void setAuthToken(String authToken) {
        PrefUtil.putString("", authToken);
    }

    public static void setAutoLogin(boolean auto) {
        PrefUtil.putBoolean("", auto);
    }

    public static void setFcmPushToken(String token) {
        PrefUtil.putString("", token);
    }

    public static void setVolumnLevel(int level) {
        PrefUtil.putInt("", level);
    }

    public static void setDeviceId(String id) {
        PrefUtil.putString("", id);
    }
}
