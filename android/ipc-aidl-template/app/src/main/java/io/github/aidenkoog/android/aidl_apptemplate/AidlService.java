package io.github.aidenkoog.android.aidl_apptemplate;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

import io.github.aidenkoog.android.aidl_apptemplate.manager.AidlStubManager;

public class AidlService extends Service {

    private AidlStubManager mAidlStubManager;

    @Override
    public void onCreate() {
        super.onCreate();
        mAidlStubManager = AidlStubManager.getStubManager(getApplicationContext());
    }

    @Override
    public void onDestroy() {
        mAidlStubManager.clearCallbackMap();
        super.onDestroy();
    }

    @Override
    public boolean onUnbind(Intent intent) {
        return super.onUnbind(intent);
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mAidlStubManager.getAidlStubManagerImpl();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        super.onStartCommand(intent, flags, startId);
        return START_STICKY;
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
    }

    @Override
    public void onRebind(Intent intent) {
        super.onRebind(intent);
    }
}
