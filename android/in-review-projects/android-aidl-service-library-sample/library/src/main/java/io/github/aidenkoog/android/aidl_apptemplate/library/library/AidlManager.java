package io.github.aidenkoog.android.aidl_apptemplate.library.library;

import android.content.Context;
import android.os.Bundle;

import io.github.aidenkoog.android.aidl_apptemplate.library.library.callback.ResultCallback;
import io.github.aidenkoog.android.aidl_apptemplate.library.library.utils.DebugLogger;

public class AidlManager extends BaseAidlManager {

    private static final String TAG = AidlManager.class.getSimpleName();

    private volatile static AidlManager mAidlManager;

    /* Thread safe lazy initialization + Double-checked locking */
    public static AidlManager getAidlManager(Context context, ResultCallback callback) {
        if (mAidlManager == null) {
            synchronized (AidlManager.class) {
                if (mAidlManager == null) {
                    mAidlManager = new AidlManager(context, callback);
                }
            }
        }
        DebugLogger.d(TAG, "getAidlManager: return mAidlManager");
        return mAidlManager;
    }

    private AidlManager(Context context, ResultCallback callback) {
        super(context, callback);
    }

    @Override
    public String getSequenceId() {
        return super.getSequenceId();
    }

    @Override
    protected void clearManager() {
        mAidlManager = null;
    }

    /* API command */
    public Bundle command(String command) {
        return command(command, null);
    }

    public Bundle command(String command, Bundle params) {
        return super.command(command, params, 0);
    }

    @Override
    public Bundle command(String command, Bundle params, int waitingMillis) {
        return super.command(command, params, waitingMillis);
    }
}
