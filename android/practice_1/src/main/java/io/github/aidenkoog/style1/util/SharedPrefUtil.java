package io.github.aidenkoog.style1.util;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;

public class SharedPrefUtil {
    private static SharedPreferences mPreferences;

    public static void init(Context context) {
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

    public static void putBoolean(String key, boolean Value) {
        if (mPreferences == null) {
            return;
        }
        SharedPreferences.Editor mEditer = mPreferences.edit();
        mEditer.putBoolean(key, Value);
        mEditer.commit();
    }

    public static String getString(String key, String defaultValue) {
        if (mPreferences == null) {
            return defaultValue;
        }
        return mPreferences.getString(key, defaultValue);
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
            return defaultValue;
        }
        return mPreferences.getInt(key, defaultValue);
    }

    public static void putInt(String key, int value) {
        if (mPreferences == null) {
            return;
        }
        SharedPreferences.Editor mEditer = mPreferences.edit();
        mEditer.putInt(key, value);
        mEditer.commit();
    }
}
