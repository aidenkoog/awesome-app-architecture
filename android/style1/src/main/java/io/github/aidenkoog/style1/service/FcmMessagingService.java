package io.github.aidenkoog.style1.service;

import android.app.ActivityManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.text.TextUtils;

import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

import io.github.aidenkoog.style1.R;
import io.github.aidenkoog.style1.activity.SplashActivity;
import io.github.aidenkoog.style1.util.CommonUtil;
import io.github.aidenkoog.style1.util.Logger;
import io.github.aidenkoog.style1.util.SharedPrefUtil;

public class FcmMessagingService extends FirebaseMessagingService {

    public static final String FCM_PUSH_DATA = "FCM_PUSH_DATA";
    public static final String ACTION_SHOW_FCM_PUSH_POPUP = "ACTION_SHOW_FCM_PUSH_POPUP";

    @Override
    public void handleIntent(Intent intent) {
        super.handleIntent(intent);
        if (intent == null || intent.getExtras() == null) {
            return;
        }
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        Logger.i("message type => " + remoteMessage.getMessageType());
        Logger.i("message id => " + remoteMessage.getMessageId());

        /* check push message */
        String pushMessage = getDataTypeMessage(remoteMessage);
        pushMessage = pushMessage == null || TextUtils.isEmpty(pushMessage) ?
                getNotificationTypeMessage(remoteMessage) : pushMessage;
        if (pushMessage == null || pushMessage.isEmpty()) {
            Logger.e("push message is null or empty !!!");
            return;
        }

        /* show notification */
        NotificationManager manager
                = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        createNotificationChannel(manager);
        int notificationId = getNotificationId();
        manager.notify(notificationId, buildNotification(notificationId, pushMessage));

        /* check if top activity belongs to SmartPlus app */
        String topActivityFullClassName = getTopActivityClassName();
        if (topActivityFullClassName.contains(getApplicationContext().getPackageName())) {
            showFcmPushPopup(pushMessage, topActivityFullClassName);
        }
    }

    private int getNotificationId() {
        int notificationId = Integer.parseInt(
                new SimpleDateFormat("HHmmssSSS", Locale.UK).format(new Date()));
        Logger.i("notification id => " + notificationId);
        return notificationId;
    }

    private String getDataTypeMessage(RemoteMessage remoteMessage) {
        Map<String, String> dataMap = remoteMessage.getData();
        if (dataMap == null) {
            Logger.d("dataMap is null !!!");
            return null;
        }
        Logger.d("[data-type] message => " + dataMap.toString());
        return dataMap.get("message");
    }

    private String getNotificationTypeMessage(RemoteMessage remoteMessage) {
        RemoteMessage.Notification notification = remoteMessage.getNotification();
        if (notification == null) {
            Logger.d("notification is null !!!");
            return null;
        }
        String notificationBody = notification.getBody();
        Logger.d("[notification-type] message => " + notificationBody);
        return notificationBody;
    }

    private String getTopActivityClassName() {
        ActivityManager activityManager = (ActivityManager) this.getSystemService(Context.ACTIVITY_SERVICE);

        ComponentName componentName = activityManager.getRunningTasks(1).get(0).topActivity;
        String topActivityClassName = componentName.getClassName();
        Logger.d("top activity class name => " + topActivityClassName);

        return topActivityClassName == null ? "" : topActivityClassName;
    }

    private Notification buildNotification(int notificationId, String notificationMessage) {
        Intent intent = new Intent(getApplicationContext(), SplashActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK
                | Intent.FLAG_ACTIVITY_CLEAR_TASK
                | Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS
                | Intent.FLAG_ACTIVITY_NO_ANIMATION);
        intent.putExtra(FCM_PUSH_DATA, notificationMessage);

        PendingIntent pendingIntent = PendingIntent.getActivity(
                getApplicationContext(), notificationId, intent, PendingIntent.FLAG_ONE_SHOT);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, getPackageName())
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle(getResources().getString(R.string.app_name))
                .setContentText(notificationMessage)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(notificationMessage))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setDefaults(Notification.DEFAULT_ALL);
        builder.setContentIntent(pendingIntent);
        builder.setAutoCancel(true);
        return builder.build();
    }

    /* send local broadcast to show fcm push popup */
    private void showFcmPushPopup(String notificationMessage, String topActivityFullClassName) {
        Intent intent = new Intent();
        intent.setAction(ACTION_SHOW_FCM_PUSH_POPUP);
        intent.putExtra("top_activity", topActivityFullClassName);
        intent.putExtra("message", notificationMessage);
        sendBroadcast(intent);
    }

    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();
        Logger.d("");
    }

    @Override
    public void onNewToken(String newToken) {
        super.onNewToken(newToken);
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(newTokenTask -> {
            if (!newTokenTask.isSuccessful()) {
                Logger.d("fetching FCM registration token failed !!!");
                return;
            }
            /* Get new FCM registration token */
            String token = newTokenTask.getResult();
            Logger.d("FCM new token => " + token);

            /* Save & update new token */
            SharedPrefUtil.putString("key", token);
            CommonUtil.updatePushToken();
        });
    }

    private void createNotificationChannel(NotificationManager manager) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

            CharSequence channelName = "CHANNEL_NAME";
            String description = "CHANNEL_DESCRIPTION";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            Logger.d("channelName => " + channelName
                    + ", description => " + description
                    + ", importance => " + importance);

            NotificationChannel channel
                    = new NotificationChannel(getPackageName(), channelName, importance);
            channel.setDescription(description);
            channel.enableVibration(true);
            channel.enableLights(true);
            channel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
            manager.createNotificationChannel(channel);
        }
    }
}