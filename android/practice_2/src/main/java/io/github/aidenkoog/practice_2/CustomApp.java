package io.github.aidenkoog.practice_2;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;
import android.os.StrictMode;

import io.github.aidenkoog.practice_2.repo.shard_pref.core.PrefUtil;
import io.github.aidenkoog.practice_2.util.Utils;

import io.paperdb.Paper;

public class CustomApp extends Application {
    private static Context APP_CONTEXT;
    private static CustomApp INSTANCE;

    @Override
    public void onCreate() {
        super.onCreate();
        INSTANCE = this;
        if (APP_CONTEXT == null) {
            APP_CONTEXT = getApplicationContext();
        }
        if (Build.VERSION.SDK_INT > 9) {
            StrictMode.ThreadPolicy policy
                    = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }
        PrefUtil.init(APP_CONTEXT);
        Paper.init(APP_CONTEXT);
        setNotificationCannel();
        Utils.updatePushToken();
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
    }

    public static CustomApp getInstance() {
        return INSTANCE;
    }

    public static Context getContext() {
        return APP_CONTEXT;
    }

    private void setNotificationCannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "CHANNEL_NAME";
            String description = "CHANNEL_DESCRIPTION";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(
                    getPackageName(), name, importance);
            channel.setDescription(description);
            NotificationManager mNotificationManager
                    = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            mNotificationManager.createNotificationChannel(channel);
        }
    }
}