package io.github.aidenkoog.practice_2.repo.shard_pref.core;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;

public class PrefUtil {

    private static SharedPreferences mPreferences;
    public static final String KEY_PUSH_DEVICE_ID = "KEY_PUSH_DEVICE_UUID";
    public static final String KEY_USER_ID = "KEY_USER_ID";
    public static final String KEY_USER_PW = "KEY_USER_PW";
    public static final String KEY_USER_ID_BACKUP = "KEY_USER_ID_BACKUP";
    public static final String KEY_USER_PW_BACKUP = "KEY_USER_PW_BACKUP";
    public final static String KEY_FCM_PUSH_TOKEN = "KEY_FCM_PUSH_TOKEN";

    public static void init(final Context context) {
        if (mPreferences == null) {
            mPreferences = context.getSharedPreferences(context.getPackageName(), Activity.MODE_PRIVATE);
        }
    }

    public static boolean getBoolean(String key, boolean defaultValue) {
        if (mPreferences == null) {
            return defaultValue;
        }
        return mPreferences.getBoolean(key, defaultValue);
    }

    public static String getString(String key, String defaultValue) {
        if (mPreferences == null) {
            return defaultValue;
        }
        return mPreferences.getString(key, defaultValue);
    }

    public static void putBoolean(String key, boolean value) {
        if (mPreferences == null) {
            return;
        }
        SharedPreferences.Editor mEditer = mPreferences.edit();
        mEditer.putBoolean(key, value);
        mEditer.commit();
    }

    public static void putInt(String key, int value) {
        if (mPreferences == null) {
            return;
        }
        SharedPreferences.Editor mEditer = mPreferences.edit();
        mEditer.putInt(key, value);
        mEditer.commit();
    }

    public static void putString(String key, String value) {
        if (mPreferences == null) {
            return;
        }
        SharedPreferences.Editor mEditer = mPreferences.edit();
        mEditer.putString(key, value);
        mEditer.commit();
    }

    public static int getInt(String key, int defaultValue) {
        if (mPreferences == null) {
            return -1;
        }
        return mPreferences.getInt(key, defaultValue);
    }

    public static Boolean containData(String key) {
        if (mPreferences == null) {
            return Boolean.FALSE;
        }
        return mPreferences.contains(key);
    }

    public static void removePref(String keyData) {
        if (mPreferences == null) {
            return;
        }
        SharedPreferences.Editor editor = mPreferences.edit();
        editor.remove(keyData);
        editor.commit();
    }

    public static void setPrefObject(String strPrefName, Object obj) {
        if (mPreferences == null) {
            return;
        }
        if (TextUtils.isEmpty(strPrefName) || null == obj) {
            return;
        }

        SharedPreferences.Editor edit = mPreferences.edit();
        if (obj instanceof String) {
            edit.putString(strPrefName, (String) obj);
        } else if (obj instanceof Boolean) {
            edit.putBoolean(strPrefName, (Boolean) obj);
        } else if (obj instanceof Integer) {
            edit.putInt(strPrefName, (Integer) obj);
        } else if (obj instanceof Float) {
            edit.putFloat(strPrefName, (Float) obj);
        } else if (obj instanceof Long) {
            edit.putLong(strPrefName, (Long) obj);
        }
        edit.commit();
    }

    public static void clearUserIdAndPw() {
        PrefUtil.removePref(PrefUtil.KEY_USER_ID);
        PrefUtil.removePref(PrefUtil.KEY_USER_PW);
    }
}