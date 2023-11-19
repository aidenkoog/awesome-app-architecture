package io.github.aidenkoog.android.aidl_apptemplate.manager;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Bundle;
import android.os.HandlerThread;
import android.os.RemoteException;

import java.util.ConcurrentModificationException;

import io.github.aidenkoog.android.aidl_apptemplate.ApiHandler;
import io.github.aidenkoog.android.aidl_apptemplate.IAidlManager;
import io.github.aidenkoog.android.aidl_apptemplate.IAidlManagerCallback;
import io.github.aidenkoog.android.aidl_apptemplate.library.library.utils.DebugLogger;
import io.github.aidenkoog.android.aidl_apptemplate.utils.Utils;

import static io.github.aidenkoog.android.aidl_apptemplate.ApiCommand.*;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.*;

public class AidlStubManager extends BaseAidlStubManager {

    private static final String TAG = AidlStubManager.class.getSimpleName();

    @SuppressLint("StaticFieldLeak")
    private static AidlStubManager mAidlStubManager;

    public static AidlStubManager getStubManager(Context context) {
        if (mAidlStubManager == null) {
            mAidlStubManager = new AidlStubManager(context);
        }
        return mAidlStubManager;
    }

    private AidlStubManager(Context context) {
        mContext = context;
        HandlerThread handlerThread = new HandlerThread(TAG);
        handlerThread.start();
        mApiHandler = new ApiHandler(mContext, handlerThread.getLooper(), mCallbackMap);
    }

    public IAidlManager.Stub getAidlStubManagerImpl() {
        return mAidlManagerImpl;
    }

    private final IAidlManager.Stub mAidlManagerImpl = new IAidlManager.Stub() {

        @Override
        public Bundle command(String command, Bundle params) {

            Bundle result = Utils.getInitializedBundle(Utils.getExaminedParams(params));
            if (result == null) {
                DebugLogger.e(TAG, "Wrong command event");
                return null;
            }

            if (CMD_TEST.equals(command)) {// Synchronous
                DebugLogger.d(TAG, "synchronous command");
            } else {// Asynchronous
                mApiHandler.sendMessage(mApiHandler.obtainMessage(mApiHandler.getApiMessageWhat(), result));
            }
            return result;
        }

        @Override
        public boolean registerCallback(String callbackId, IAidlManagerCallback callback) {
            boolean isRegistered = false;

            if (callback != null) {
                if (mCallbackMap == null) {
                    return false;
                }
                if (callbackId == null) {
                    return false;
                }
                String packageNameToRegister = callbackId.split(",")[1];

                synchronized (mCallbackMap) {
                    for (String key : mCallbackMap.keySet()) {
                        try {
                            String[] splitedKey = key.split(",");
                            String packageNameOfKey = splitedKey[1];

                            if (packageNameToRegister.equals(packageNameOfKey)) {
                                mCallbackMap.remove(key);
                            }
                        } catch (ConcurrentModificationException e) {
                            e.printStackTrace();
                        }
                    }
                    mCallbackMap.put(callbackId, callback);
                }
                Bundle result = new Bundle();
                result.putString(KEY_COMMAND, ON_SERVICE_BOUND);
                result.putString(KEY_CALLBACK_PACKAGE_NAME, mContext.getPackageName());
                result.putString(KEY_PACKAGE_NAME, mContext.getPackageName());

                try {
                    IAidlManagerCallback callbackF = mCallbackMap.get(callbackId);
                    if (callbackF == null) {
                        DebugLogger.e(TAG, "!!! callbackF is null !!!");
                        return false;
                    }
                    callbackF.onCallbackResult(ON_SERVICE_BOUND, result);
                    isRegistered = true;

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return isRegistered;
        }

        @Override
        public boolean unregisterCallback(String callbackId, IAidlManagerCallback callback) {

            boolean isUnRegistered = false;
            if (callback != null) {
                Bundle result = new Bundle();
                result.putString(KEY_COMMAND, ON_SERVICE_UNBOUND);

                try {
                    callback.onCallbackResult(ON_SERVICE_UNBOUND, result);
                } catch (RemoteException e) {
                    e.printStackTrace();
                }

                synchronized (mCallbackMap) {
                    try {
                        mCallbackMap.remove(callbackId);
                        for (String key : mCallbackMap.keySet()) {
                            String[] splitedCallbackId = key.split(",");
                            boolean isSamePackageNameExisting = mCallbackMap.containsKey(splitedCallbackId[1]);
                            if (isSamePackageNameExisting) {
                                mCallbackMap.remove(key);
                            }
                        }
                    } catch (ConcurrentModificationException e) {
                        e.printStackTrace();
                    }
                }
                isUnRegistered = true;
            }
            DebugLogger.e(TAG, (callbackId.split(",")[1]) + "'s callback is going to be removed");
            return isUnRegistered;
        }
    };
}
