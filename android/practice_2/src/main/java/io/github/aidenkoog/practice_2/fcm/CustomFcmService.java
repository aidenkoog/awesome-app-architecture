package io.github.aidenkoog.practice_2.fcm;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import io.github.aidenkoog.practice_2.R;
import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.ui.splash.SplashActivity;
import io.github.aidenkoog.practice_2.repo.shard_pref.core.PrefUtil;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;

public class CustomFcmService extends FirebaseMessagingService {

    private static final String PREFIX_MSG = "[FCM]: ";
    private static final String FCM_PUSH_DATA = "FCM_PUSH_DATA";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        Map<String, String> data = remoteMessage.getData();
        if (data == null) {
            CustomLogger.e(PREFIX_MSG + "message data is null !!!");
            return;
        }
        sendNotification(getTitle(data), getMessage(data), data);
    }

    private void sendNotification(String title, String msg, Map<String, String> data) {
        Intent startIntent = new Intent(getApplicationContext(), SplashActivity.class);

        Iterator<String> iterator = data.keySet().iterator();
        while (iterator.hasNext()) {
            String key = iterator.next();
            startIntent.putExtra(key, data.get(key));
        }
        startIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK
                | Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS | Intent.FLAG_ACTIVITY_NO_ANIMATION);
        startIntent.putExtra(FCM_PUSH_DATA, msg);

        int bigIcon = R.mipmap.ic_launcher;
        int smallIcon = R.mipmap.ic_launcher;

        int notificationId = Integer.parseInt(
                new SimpleDateFormat("HHmmssSSS").format(new Date()));
        CustomLogger.e(PREFIX_MSG + "notificationId :Bundle " + notificationId);
        PendingIntent pendingIntent = PendingIntent.getActivity(getApplicationContext(),
                notificationId, startIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder notificationBuilder
                = new NotificationCompat.Builder(this, getPackageName())
                .setLargeIcon(BitmapFactory.decodeResource(getResources(), bigIcon))
                .setSmallIcon(smallIcon)
                .setAutoCancel(true)
                .setContentTitle(title)
                .setContentText(msg)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(msg))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setDefaults(Notification.DEFAULT_ALL)
                .setContentIntent(pendingIntent);
        Notification notification = notificationBuilder.build();

        NotificationManager notificationManager
                = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        createNotificationChannel(notificationManager);
        notificationManager.notify(notificationId, notification);
    }

    private String getMessage(Map<String, String> data) {
        CustomLogger.d(PREFIX_MSG + "[data-type] message => " + data.toString());
        String pushMessage = data.get("message");
        pushMessage = pushMessage == null || pushMessage.isEmpty() ? "Unknown Message" : pushMessage;
        return pushMessage;
    }

    private String getTitle(Map<String, String> data) {
        String pushTitle = data.get("title");
        pushTitle = pushTitle == null || pushTitle.isEmpty() ? "Unknown Message" : pushTitle;
        return pushTitle;
    }

    private void createNotificationChannel(NotificationManager notificationManager) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = getString(R.string.notification_channel_name);
            String description = getString(R.string.notification_channel_description);
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel(getPackageName(), name, importance);
            channel.setDescription(description);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @Override
    public void onNewToken(String newToken) {
        super.onNewToken(newToken);
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(newTokenTask -> {
            if (!newTokenTask.isSuccessful()) {
                CustomLogger.d(PREFIX_MSG + "fetching FCM registration token failed !!!");
                return;
            }
            String token = newTokenTask.getResult();
            CustomLogger.d(PREFIX_MSG + "new token => " + token);
            PrefUtil.putString(PrefUtil.KEY_FCM_PUSH_TOKEN, token);
        });
    }

    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();
    }
}