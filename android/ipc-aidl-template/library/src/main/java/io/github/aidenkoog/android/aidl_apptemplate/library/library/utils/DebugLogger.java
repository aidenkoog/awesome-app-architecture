package io.github.aidenkoog.android.aidl_apptemplate.library.library.utils;

import android.util.Log;

public class DebugLogger {
    private static final String TAG = "AIDL_AppTemplate";
    public static final boolean DEBUG = true;

    public static void v(String subTag, String message) {
        if (DEBUG) {
            Log.v(TAG, subTag + " : " + message);
        }
    }

    public static void v(boolean moduleDebug, String subTag, String message) {
        if (DEBUG && moduleDebug) {
            Log.v(TAG, subTag + " : [D] " + message);
        }
    }


    public static void d(String subTag, String message) {
        if (DEBUG) {
            Log.d(TAG, subTag + " : " + message);
        }
    }

    public static void d(boolean moduleDebug, String subTag, String message) {
        if (DEBUG && moduleDebug) {
            Log.d(TAG, subTag + " : [D] " + message);
        }
    }

    public static void i(String subTag, String message) {
        if (DEBUG) {
            Log.i(TAG, subTag + " : " + message);
        }
    }

    public static void i(boolean moduleDebug, String subTag, String message) {
        if (DEBUG && moduleDebug) {
            Log.i(TAG, subTag + " : [D] " + message);
        }
    }

    public static void w(String subTag, String message) {
        if (DEBUG) {
            Log.w(TAG, subTag + " : " + message);
        }
    }

    public static void w(boolean moduleDebug, String subTag, String message) {
        if (DEBUG && moduleDebug) {
            Log.w(TAG, subTag + " : " + message);
        }
    }

    public static void e(String subTag, String message) {
        if (DEBUG) {
            Log.e(TAG, subTag + " : " + message);
        }
    }

    public static void e(boolean moduleDebug, String subTag, String message) {
        if (DEBUG && moduleDebug) {
            Log.e(TAG, subTag + " : [D] " + message);
        }
    }
}
