package io.github.aidenkoog.style1.navigator;

import android.content.Intent;
import android.os.Bundle;

public interface BaseNavigator {

    void startAnotherActivity(Class<?> cls, Intent intent);

    void showToast(String message, int length);

    void activityFinish();

    void showPopup();

    String getStringFromResId(int resId);

    int getColorFromResId(int resId);

    Intent getIntentData();

    void updateUi(Bundle params);
}
