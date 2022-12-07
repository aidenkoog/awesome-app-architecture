package io.github.aidenkoog.practice_2.util;

import android.content.Context;
import android.location.LocationManager;
import android.os.Build;
import android.text.TextUtils;

import com.google.firebase.messaging.FirebaseMessaging;
import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.shard_pref.core.PrefUtil;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.TimeZone;
import java.util.UUID;

public class Utils {
    /* Under Construction, Added this function for temporary testing */
    public static void updatePushToken() {
        // get firebase messaging token
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(pushTokenTask -> {
            if (!pushTokenTask.isSuccessful()) {
                CustomLogger.d("fetching fcm registration pushToken failed");
                return;
            }
            // Get new FCM registration token
            String pushToken = pushTokenTask.getResult();
            CustomLogger.d("fcm pushToken => " + pushToken);
            PrefUtil.putString(PrefUtil.KEY_FCM_PUSH_TOKEN, pushToken);
        });
    }

    public static int getColorWrapper(Context context, int id) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return context.getColor(id);
        } else {
            return context.getResources().getColor(id);
        }
    }

    public static boolean checkEmptyString(String s) {
        boolean returnValue;
        if (s != null && s.length() > 0 && !s.equals("")) {
            returnValue = false;
        } else {
            returnValue = true;
        }
        return returnValue;
    }

    public static String getHourString(Context context, int time, int resID1, int resID2, boolean isFullTxt) {
        CustomLogger.d("time => " + time + ", resID1 => " + resID1 + ", resID2 => " + resID2 + ", isFullTxt => " + isFullTxt);
        if (isFullTxt) {
            String hourString = context.getString(time == 1 ? resID1 : resID2, time);
            CustomLogger.d("hourString => " + hourString);
            return hourString;
        } else {
            String hourString = context.getString(time == 1 ? resID1 : resID2);
            CustomLogger.d("hourString => " + hourString);
            return hourString;
        }
    }

    public static ArrayList<String> getTimeZoneArrayList(ArrayList<String> arrayGmt) {
        ArrayList<String> timeZoneArray = new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("dd MMMM HH:mm (z)", Locale.US);
        String str = "";
        for (int i = 0; i < arrayGmt.size(); i++) {
            TimeZone timeZone = TimeZone.getTimeZone(arrayGmt.get(i));
            Calendar cal = Calendar.getInstance(timeZone);
            format.setCalendar(cal);
            Date testData = cal.getTime();
            str = format.format(testData);
            timeZoneArray.add(str);
        }
        CustomLogger.d("Timezone Array => " + timeZoneArray.toString());
        return timeZoneArray;
    }

    public static String getLocalGMT() {
        String ret = "GMT+00:00";
        String checkStr = "";
        try {
            TimeZone tz;
            Date date = new Date();
            SimpleDateFormat df = new SimpleDateFormat("z", Locale.getDefault());
            GregorianCalendar localTime = (GregorianCalendar) GregorianCalendar.getInstance();
            tz = localTime.getTimeZone();
            df.setTimeZone(tz);
            checkStr = df.format(date);
            CustomLogger.d("checkStr => " + checkStr);

            if (TextUtils.isEmpty(checkStr)) {
                return ret;
            }

            if (!checkStr.startsWith("GMT")) {
                switch (checkStr) {
                    case "HAST":
                    case "HST":
                        ret = "GMT-10:00";
                        break;
                    case "AKST":
                        ret = "GMT-09:00";
                        break;
                    case "PST":
                        ret = "GMT-08:00";
                        break;
                    case "MST":
                        ret = "GMT-07:00";
                        break;
                    case "CST":
                        ret = "GMT-06:00";
                        break;
                    case "EST":
                        ret = "GMT-05:00";
                        break;
                    case "AST":
                        ret = "GMT-04:00";
                        break;
                    default:
                        ret = "GMT+00:00";
                        break;
                }
            } else {
                ret = checkStr;
            }
            return ret;
        } catch (Exception e) {
            return ret;
        }
    }

    public static boolean checkOnGPS(Context _context) {
        LocationManager lm = (LocationManager) _context.getSystemService(Context.LOCATION_SERVICE);
        try {
            boolean gpsEnabled = lm.isProviderEnabled(LocationManager.GPS_PROVIDER);
            CustomLogger.d("gpsEnabled => " + gpsEnabled);
            return lm.isProviderEnabled(LocationManager.GPS_PROVIDER);
        } catch (Exception e) {
            return false;
        }
    }

    public static String getPhoneUuid(String phoneUuidInMqttData) {
        final String KEY_PHONE_UUID = "pref_device_uuid";
        String phoneUuid = phoneUuidInMqttData;
        CustomLogger.d("phoneUuid => " + phoneUuid);
        if (TextUtils.isEmpty(phoneUuid)) {
            phoneUuid = PrefUtil.getString(KEY_PHONE_UUID, null);
            if (TextUtils.isEmpty(phoneUuid)) {
                phoneUuid = UUID.randomUUID().toString();
                PrefUtil.setPrefObject(KEY_PHONE_UUID, phoneUuid);
            }
        }
        return phoneUuid;
    }
}