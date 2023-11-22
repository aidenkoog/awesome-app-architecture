package io.github.aidenkoog.android.aidl_apptemplate;

import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;

import io.github.aidenkoog.android.aidl_apptemplate.library.library.utils.DebugLogger;
import io.github.aidenkoog.android.aidl_apptemplate.utils.Utils;

import static io.github.aidenkoog.android.aidl_apptemplate.ApiCommand.*;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.*;

import java.util.concurrent.ConcurrentHashMap;

public class ApiHandler extends Handler {

    private static final String TAG = ApiHandler.class.getSimpleName();

    private ConcurrentHashMap<String, IAidlManagerCallback> mCallbackMap;
    private final Context mContext;

    public int getApiMessageWhat() {
        return MSG_API;
    }

    public ApiHandler(Context context, Looper lopper, ConcurrentHashMap<String, IAidlManagerCallback> callbackMap) {
        super(lopper);
        mContext = context;
        mCallbackMap = callbackMap;
    }

    @Override
    public void handleMessage(Message message) {
        Bundle result = Utils.inspectMessage(message, getApiMessageWhat(), mCallbackMap);
        if (result == null) {
            return;
        }
        String cmdString = result.getString(KEY_COMMAND);
        if (cmdString == null) {
            return;
        }
        if (CMD_TEST.equals(cmdString)) {
        } else {
            DebugLogger.d(TAG, "unhandled command : " + cmdString);
        }
        super.handleMessage(message);
    }
}