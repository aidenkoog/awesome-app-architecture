package io.github.aidenkoog.practice_2.ui.view;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;

import io.github.aidenkoog.practice_2.R;
import io.github.aidenkoog.practice_2.logging.CustomLogger;

public class CustomToast extends Toast implements Handler.Callback, DialogInterface.OnDismissListener {

    private static final long TOAST_HIDE_DELAYED_TIME = 2000;
    private static final int MSG_SHOW_TOAST = 100;
    private static final int MSG_HIDE_TOAST = MSG_SHOW_TOAST + 1;
    private final Context context;
    private AlertDialog mAlertDialog = null;
    private Handler mHandler = new Handler(this);

    public CustomToast(Context context) {
        super(context);
        this.context = context;
    }

    public void showToast(String msg) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.toast_layout, null);
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        TextView toastMsg = view.findViewById(R.id.toast_msg);
        toastMsg.setText(msg);
        builder.setView(view);
        mAlertDialog = builder.create();
        mAlertDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        mAlertDialog.setOnDismissListener(this);
        mHandler.removeMessages(MSG_HIDE_TOAST);
        mHandler.sendMessage(mHandler.obtainMessage(MSG_SHOW_TOAST));
    }

    @Override
    public boolean handleMessage(@NonNull Message msg) {
        switch(msg.what) {
            case MSG_SHOW_TOAST:
                if (mAlertDialog != null && mAlertDialog.isShowing()) {
                    mAlertDialog.dismiss();
                }
                mAlertDialog.show();
                mHandler.removeMessages(MSG_HIDE_TOAST);
                mHandler.sendMessageDelayed(mHandler.obtainMessage(MSG_HIDE_TOAST), TOAST_HIDE_DELAYED_TIME);
                break;
            case MSG_HIDE_TOAST:
                if (mAlertDialog != null && mAlertDialog.isShowing()) {
                    mAlertDialog.dismiss();
                }
                mHandler.removeMessages(MSG_HIDE_TOAST);
                break;
        }
        return false;
    }

    @Override
    public void onDismiss(DialogInterface dialog) {
        CustomLogger.e("custom toast dismiss !!!");
        mHandler.removeMessages(MSG_HIDE_TOAST);
    }
}