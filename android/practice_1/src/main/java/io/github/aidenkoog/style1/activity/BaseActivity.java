package io.github.aidenkoog.style1.activity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import androidx.appcompat.app.AppCompatActivity;
import androidx.databinding.ViewDataBinding;
import io.github.aidenkoog.style1.navigator.BaseNavigator;
import io.github.aidenkoog.style1.util.Logger;
import io.github.aidenkoog.style1.viewmodel.BaseViewModel;


public abstract class BaseActivity<T extends ViewDataBinding, V extends BaseViewModel>
        extends AppCompatActivity implements BaseNavigator {

    private class FcmPushMessageReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {

            String currentActivity = intent.getStringExtra("top_activity");
            Logger.d("currentActivity => " + currentActivity);

            String action = intent.getAction();
            if (action == null || TextUtils.isEmpty(action)) {
                return;
            }

            String fcmPushDataMessage = intent.getStringExtra("message");
            if (fcmPushDataMessage == null || TextUtils.isEmpty(fcmPushDataMessage)) {
                return;
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }
}