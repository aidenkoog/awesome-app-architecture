package io.github.aidenkoog.android.aidl_apptemplate.data;

import io.github.aidenkoog.android.aidl_apptemplate.IAidlManagerCallback;

public class CallbackData {

    private IAidlManagerCallback mManagerCallback;
    private int mCallbackPid;
    private String mCallbackPackageName;

    public IAidlManagerCallback getManagerCallback() {
        return mManagerCallback;
    }

    public CallbackData setManagerCallback(IAidlManagerCallback mManagerCallback) {
        this.mManagerCallback = mManagerCallback;
        return this;
    }

    public int getCallbackPid() {
        return mCallbackPid;
    }

    public CallbackData setCallbackPid(int mCallbackPid) {
        this.mCallbackPid = mCallbackPid;
        return this;
    }

    public String getCallbackPackageName() {
        return mCallbackPackageName;
    }

    public CallbackData setCallbackPackageName(String mCallbackPackageName) {
        this.mCallbackPackageName = mCallbackPackageName;
        return this;
    }
}
