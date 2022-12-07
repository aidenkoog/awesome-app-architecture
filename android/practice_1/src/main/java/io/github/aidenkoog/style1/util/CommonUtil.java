package io.github.aidenkoog.style1.util;

import android.app.AlertDialog;
import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.os.Build;
import android.text.InputFilter;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextUtils;
import android.text.style.ForegroundColorSpan;

import com.google.firebase.messaging.FirebaseMessaging;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import io.github.aidenkoog.style1.network.RepositoryURL;
import io.github.aidenkoog.style1.network.RestfulAdapter;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;

public class CommonUtil {

    public static boolean isEmailValid(String email) {
        String expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[\\w\\-]+$";
        Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean isPasswordValid(String password) {
        if (password.matches("[0-9]+")) {
            return false;
        } else if (password.matches("[^0-9]+")) {
            return false;
        } else if (password.matches("[\\w-]+")) {
            return true;
        }
        return false;
    }

    public static InputFilter PostalCodeCharacterFilter = (source, start, end, dest, dstart, dend) -> {
        Pattern ps = Pattern.compile("^[a-zA-Z0-9]*$");
        boolean keepOriginal = true;
        StringBuilder sb = new StringBuilder(end - start);
        for (int i = start; i < end; i++) {
            char c = source.charAt(i);
            if (ps.matcher(String.valueOf(c)).matches()) // put your condition here
                sb.append(c);
            else
                keepOriginal = false;
        }
        if (keepOriginal)
            return null;
        else {
            if (source instanceof Spanned) {
                SpannableString sp = new SpannableString(sb);
                TextUtils.copySpansFrom((Spanned) source, start, sb.length(), null, sp, 0);
                return sp;
            } else {
                return sb;
            }
        }
    };

    public static int dpToPx(int dp) {
        return (int) (dp * Resources.getSystem().getDisplayMetrics().density);
    }

    public static String getDate(long milliSeconds, String dateFormat) {
        // Create a DateFormatter object for displaying date in specified format.
        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
        // Create a calendar object that will convert the date and time value in milliseconds to date.
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(milliSeconds);
        return formatter.format(calendar.getTime());
    }

    public static String readText(String file, Context context) throws IOException {
        InputStream is = context.getAssets().open(file);
        int size = is.available();
        byte[] buffer = new byte[size];
        is.read(buffer);
        is.close();
        String text = new String(buffer);
        return text;
    }

    public static SpannableString getColorText(String _str, String _colStr, String _color) {
        SpannableString spannableString = new SpannableString(_str);
        int color = Color.parseColor(_color);
        int targetStartIndex = _str.indexOf(_colStr);
        int targetEndIndex = targetStartIndex + _colStr.length();
        spannableString.setSpan(
                new ForegroundColorSpan(color), targetStartIndex,
                targetEndIndex, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        return spannableString;
    }

    public static void updatePushToken() {
        String authorization = SharedPrefUtil.getString("key", "");
        if (authorization == null || TextUtils.isEmpty(authorization)) {
            Logger.e("authorization key is null or empty, autherization => " + authorization + " !!!");
            return;
        }
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(pushTokenTask -> {
            if (!pushTokenTask.isSuccessful()) {
                Logger.w("fetching fcm registration pushToken failed");
                return;
            }
            String pushToken = pushTokenTask.getResult();
            Logger.d("fcm pushToken => " + pushToken);
            SharedPrefUtil.putString("key", pushToken);

            CompositeDisposable disposable = new CompositeDisposable();
            disposable.add(RestfulAdapter.getInstance(
                    RepositoryURL.URL,
                    RestfulAdapter.JSON_HEADER)
                    .putSettings(authorization, "", null)
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(resultJson -> {

                        if (resultJson == null) {
                            Logger.e("resultJson is null !!!");
                            return;
                        }

                    }, throwable -> Logger.e(throwable.getLocalizedMessage() + " !!!"))
            );
        });
    }

    @Deprecated
    private static AlertDialog.Builder getOSDefaultDialog(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            return new AlertDialog.Builder(context, android.R.style.Theme_DeviceDefault_Dialog);
        } else {
            return new AlertDialog.Builder(context);
        }
    }

    public static boolean isNumberFormat(String isAgreeString) {
        try {
            Integer.parseInt(isAgreeString);
            return true;
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        return false;
    }
}