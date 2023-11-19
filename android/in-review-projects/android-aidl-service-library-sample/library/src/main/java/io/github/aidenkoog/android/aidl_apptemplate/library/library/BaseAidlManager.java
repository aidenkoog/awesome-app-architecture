package io.github.aidenkoog.android.aidl_apptemplate.library.library;

import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.CMD_UNBIND_SERVICE;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.KEY_COMMAND;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.KEY_ORIGINATOR_PACKAGE_NAME;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.KEY_ORIGINATOR_PID;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.KEY_PACKAGE_NAME;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.KEY_PID;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.KEY_SEQUENCE_ID;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.ON_SERVICE_BOUND;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.SERVICE_CLASS;
import static io.github.aidenkoog.android.aidl_apptemplate.library.data.Constants.SERVICE_PACKAGE;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.DeadObjectException;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.Process;
import android.os.RemoteException;

import java.util.Random;

import io.github.aidenkoog.android.aidl_apptemplate.IAidlManager;
import io.github.aidenkoog.android.aidl_apptemplate.IAidlManagerCallback;
import io.github.aidenkoog.android.aidl_apptemplate.library.library.callback.ResultCallback;

abstract class BaseAidlManager {

    private static final int RANDOM_INT_BOUND = 100000000;
    protected Random mRandom;

    protected IAidlManager mAidlManager;
    protected Context mContext;
    protected ResultCallback mCallback;
    private IBinder mService;

    private boolean mBound;
    private boolean mIsBinding;
    private boolean mIsCallbackRegistered;

    private final String mMyPackageName;
    private final int mMyPid;

    protected abstract void clearManager();

    protected BaseAidlManager(Context context, ResultCallback callback) {
        mContext = context;
        mCallback = callback;
        mMyPackageName = mContext.getPackageName();
        mMyPid = Process.myPid();
        mBound = mIsBinding = mIsCallbackRegistered = false;
        mRandom = new Random();
        bindService();
    }

    protected void releaseResources() {
        mService = null;
        mAidlManager = null;
        mBound = mIsBinding = mIsCallbackRegistered = false;
        clearManager();
    }

    protected String getSequenceId() {
        return "SEQ" + mRandom.nextInt(RANDOM_INT_BOUND);
    }

    protected Bundle command(String command, Bundle params, int waitingMillis) {
        if (!mBound) {
            return null;
        }

        if (!mIsCallbackRegistered) {
            return null;
        }

        if (CMD_UNBIND_SERVICE.equals(command)) {
            unregisterCallback();
            unbindService();
            return null;
        }

        if (params == null) {
            params = new Bundle();
        }

        if (params.getString(KEY_SEQUENCE_ID) == null) {
            params.putString(KEY_SEQUENCE_ID, getSequenceId());
        }

        params.putString(KEY_COMMAND, command);
        params.putString(KEY_PACKAGE_NAME, mMyPackageName);
        params.putInt(KEY_PID, mMyPid);

        if (params.getString(KEY_ORIGINATOR_PACKAGE_NAME) == null) {
            params.putString(KEY_ORIGINATOR_PACKAGE_NAME, mMyPackageName);
        }

        if (params.getInt(KEY_ORIGINATOR_PID) == 0) {
            params.putInt(KEY_ORIGINATOR_PID, mMyPid);
        }

        if (mAidlManager == null) {
            return null;
        }
        return null;
    }

    private final IAidlManagerCallback mAidlManagerCallback = new IAidlManagerCallback.Stub() {
        @Override
        public void onCallbackResult(String command, Bundle resultData) {
            if (mCallback != null) {
                mCallback.onCallback(command, resultData);
                if (ON_SERVICE_BOUND.equals(command)) {
                    mIsCallbackRegistered = true;
                }
            } else {
                mIsCallbackRegistered = false;
            }
        }
    };

    private final IBinder.DeathRecipient mRecipient = new IBinder.DeathRecipient() {
        @Override
        public void binderDied() {
            new Handler(Looper.getMainLooper()).postDelayed(() -> {
                try {
                    final IBinder binder = mService;
                    if (binder == null) {
                        return;
                    }
                    mAidlManager = IAidlManager.Stub.asInterface(binder);
                    binder.linkToDeath(mRecipient, 0);

                } catch (RemoteException e) {
                    e.printStackTrace();
                }
            }, 1000);
        }
    };

    private final ServiceConnection mServiceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder service) {
            mService = service;
            mAidlManager = IAidlManager.Stub.asInterface(mService);

            try {
                mService.linkToDeath(mRecipient, 0);

                mBound = true;
                mIsBinding = false;
                mIsCallbackRegistered = false;

                String callbackId = mMyPid + "," + mMyPackageName;
                mAidlManager.registerCallback(callbackId, mAidlManagerCallback);

            } catch (DeadObjectException e) {
                e.printStackTrace();
            } catch (RemoteException e) {
                e.printStackTrace();
            }
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            unregisterCallback();
        }
    };

    private void unregisterCallback() {
        if (mAidlManager != null) {
            try {
                String callbackId = mMyPid + "," + mMyPackageName;
                mAidlManager.unregisterCallback(callbackId, mAidlManagerCallback);

            } catch (DeadObjectException e) {
                e.printStackTrace();
            } catch (RemoteException e) {
                e.printStackTrace();
            }
        }
        releaseResources();
    }

    protected void bindService() {
        if (mIsBinding) {
            return;
        }
        mIsBinding = true;
        Intent intent = new Intent();
        intent.setPackage(SERVICE_PACKAGE);
        intent.setComponent(new ComponentName(SERVICE_PACKAGE, SERVICE_CLASS));

        boolean bindService =
                mContext.bindService(intent, mServiceConnection, Context.BIND_AUTO_CREATE);

        if (!bindService) {
            mIsBinding = mBound = mIsCallbackRegistered = false;
            return;
        }
        mIsCallbackRegistered = false;
        mIsBinding = false;
        mBound = true;
    }

    protected void unbindService() {
        mContext.unbindService(mServiceConnection);
    }
}