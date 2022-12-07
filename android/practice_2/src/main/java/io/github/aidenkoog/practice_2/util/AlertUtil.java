package io.github.aidenkoog.practice_2.util;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.widget.Toast;

public class AlertUtil {
    public static void showAlertMeg(Context context, String msg) {
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
    }

    public static void showAlertMeg(Context context, String title, String msg, String button) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle(title);
        builder.setMessage(msg);
        builder.setNegativeButton(button, (dialog, which) -> dialog.dismiss());
        builder.setCancelable(false);
        builder.create().show();
    }

    public static void showAlertMeg(Context context, String title, String msg,
                                    String okButton, String cancelButton,
                                    DialogInterface.OnClickListener okClickLinstener) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle(title);
        builder.setMessage(msg);
        builder.setPositiveButton(okButton, okClickLinstener);
        builder.setNegativeButton(cancelButton, (dialog, which) -> dialog.dismiss());
        builder.setCancelable(false);
        builder.create().show();
    }

    public static void showAlertMeg(Context context, String title, String msg, String okBtn,
                                    String cancelBtn, DialogInterface.OnClickListener okClickEvent,
                                    DialogInterface.OnClickListener cancelClickEvent) {
        try {
            title = title != null ? title : "Alert";
            AlertDialog.Builder builder = new AlertDialog.Builder(context);
            builder.setTitle(title);
            builder.setMessage(msg);
            builder.setPositiveButton(okBtn, okClickEvent);
            builder.setNegativeButton(cancelBtn, cancelClickEvent);
            builder.setCancelable(false);
            builder.create().show();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static AlertDialog progress(Context context, String message) {
        return ProgressDialog.show(context, "", message, true);
    }
}