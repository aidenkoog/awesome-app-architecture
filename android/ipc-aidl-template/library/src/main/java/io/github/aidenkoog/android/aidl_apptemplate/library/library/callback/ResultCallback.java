package io.github.aidenkoog.android.aidl_apptemplate.library.library.callback;

import android.os.Bundle;

public interface ResultCallback {
    void onCallback(String command, Bundle result);
}
