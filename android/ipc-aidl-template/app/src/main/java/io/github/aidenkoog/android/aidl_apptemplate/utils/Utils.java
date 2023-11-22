package io.github.aidenkoog.android.aidl_apptemplate.utils;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Message;
import android.os.RemoteException;

import java.util.concurrent.ConcurrentHashMap;

import io.github.aidenkoog.android.aidl_apptemplate.IAidlManagerCallback;

import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.*;

public class Utils {
    private static final String TAG = Utils.class.getSimpleName();

    public static String getPid(String packageName, ConcurrentHashMap<String, IAidlManagerCallback> callbackMap) {

        for (String key : callbackMap.keySet()) {
            String[] splitedCallbackId = key.split(",");
            if (packageName.equals(splitedCallbackId[1])) {
                return splitedCallbackId[0];
            }
        }
        return null;
    }

    public static void sendCallbackResult(boolean forNotify, Context context, IAidlManagerCallback callback, ConcurrentHashMap<String, IAidlManagerCallback> callbackMap, Bundle result, String command) {
        try {
            callback.onCallbackResult(command, result);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }

    public static void recoverClient(Context context, String action, String packageName) {
        Intent intent = new Intent();
        intent.setAction(action);
        intent.setPackage(packageName);
        context.sendBroadcast(intent);
    }

    public static Bundle inspectMessage(Message message, int apiType, ConcurrentHashMap<String, IAidlManagerCallback> callbackMap) {
        Bundle result;
        if (isCorrectMessageWhat(message, apiType)) {
            result = getResultBundle(message);
            if (result == null) {
                return null;
            } else {
                if (!isAvailableCallbackMap(callbackMap)) {
                    return null;
                }
                return result;
            }
        } else {
            return null;
        }
    }

    public static Bundle getExaminedParams(Bundle params) {
        if (params == null) {
            return null;
        }
        return params;
    }

    public static Bundle getInitializedBundle(Bundle params) {
        if (params == null) {
            return null;
        }

        String commandTag = params.getString(KEY_COMMAND);
        String packageName = params.getString(KEY_PACKAGE_NAME);
        int pid = params.getInt(KEY_PID);

        params.putString(KEY_COMMAND, commandTag);
        params.putString(KEY_PACKAGE_NAME, packageName);
        params.putInt(KEY_PID, pid);
        params.putString(KEY_CALLBACK_NAME, commandTag);
        return params;
    }

    private static Bundle getResultBundle(Message message) {
        if (message.obj == null) {
            return null;
        }
        if (message.obj instanceof Bundle) {
            return (Bundle) message.obj;
        }
        return null;
    }

    private static boolean isCorrectMessageWhat(Message message, int apiType) {
        if (message.what == apiType) {
            return true;
        }
        return false;
    }

    private static boolean isAvailableCallbackMap(ConcurrentHashMap<String, IAidlManagerCallback> callbackMap) {
        if (callbackMap == null) {
            return false;
        }
        return true;
    }
}