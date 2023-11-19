// IAidlManager.aidl
package io.github.aidenkoog.android.aidl_apptemplate;

// Declare any non-default types here with import statements
import android.os.Bundle;
import io.github.aidenkoog.android.aidl_apptemplate.IAidlManagerCallback;

interface IAidlManager {

        /********************************************************************************************
         * For AIDL update, Common command method
         * @param 1 'String type command value'
         * @param 2 'Bundle type extras value'
         ********************************************************************************************/
        Bundle command(in String command, in Bundle extras);

        boolean registerCallback(in String callbackId, in IAidlManagerCallback callback);
        boolean unregisterCallback(in String callbackId, in IAidlManagerCallback callback);
}