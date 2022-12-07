package io.github.aidenkoog.practice_2.logging;

import android.util.Log;

public class CustomLogger {
    private static final boolean LOGGER_DEBUG = true;
    static final String TAG = "Logger";

    public static final void entry() {
        if (LOGGER_DEBUG) Log.i(TAG, buildLogMsg("entered!"));
    }

    public static final void e(String message) {
        if (LOGGER_DEBUG) Log.e(TAG, buildLogMsg(message));
    }

    public static final void w(String message) {
        if (LOGGER_DEBUG) Log.w(TAG, buildLogMsg(message));
    }

    public static final void i(String message) {
        if (LOGGER_DEBUG) Log.i(TAG, buildLogMsg(message));
    }

    public static final void d(String message) {
        if (LOGGER_DEBUG) Log.d(TAG, buildLogMsg(message));
    }

    public static final void v(String message) {
        if (LOGGER_DEBUG) Log.v(TAG, buildLogMsg(message));
    }

    public static String buildLogMsg(String message) {
        StackTraceElement ste = Thread.currentThread().getStackTrace()[4];
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        sb.append(ste.getFileName().replace(".java", ""));
        sb.append("::");
        sb.append(ste.getMethodName());
        sb.append("]");
        sb.append(message);
        return sb.toString();
    }
}