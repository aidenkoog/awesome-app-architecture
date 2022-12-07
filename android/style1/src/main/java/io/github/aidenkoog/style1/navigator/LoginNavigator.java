package io.github.aidenkoog.style1.navigator;

public interface LoginNavigator extends BaseNavigator {

    void loginSuccess(boolean hasDeviceID);

    void showLoginErrorPopUp();

    void showLoginMsgPopUp(int resID);
}
