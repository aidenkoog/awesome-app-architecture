package io.github.aidenkoog.android.aidl_apptemplate.manager;

import android.content.Context;

import java.util.concurrent.ConcurrentHashMap;

import io.github.aidenkoog.android.aidl_apptemplate.ApiHandler;
import io.github.aidenkoog.android.aidl_apptemplate.IAidlManagerCallback;
import io.github.aidenkoog.android.aidl_apptemplate.library.library.utils.DebugLogger;

public class BaseAidlStubManager {

    private static final String TAG = BaseAidlStubManager.class.getSimpleName();
    protected final ConcurrentHashMap<String, IAidlManagerCallback> mCallbackMap = new ConcurrentHashMap<>();

    protected ApiHandler mApiHandler;
    protected Context mContext;

    public BaseAidlStubManager() {
        DebugLogger.d(TAG, "BaseAidlStubManager is created");
    }

    public void clearCallbackMap() {
        mCallbackMap.clear();
    }
}
