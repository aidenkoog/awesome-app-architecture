package io.github.aidenkoog.practice_2.repo.rest_api.core.api;

public class HttpApi {
    public static final String MATE_US_DEV_SERVER_URL = "https://usnm-dev-api.naviensmartcontrol.com";
    public static final String SERVER_URL = MATE_US_DEV_SERVER_URL;

    private static final String MATE_US_DEV_MQTT_IOT_ENDPOINT = "0003834koo-ats.iot.us-east-1.amazonaws.com";
    public static final String IOT_ENDPOINT = MATE_US_DEV_MQTT_IOT_ENDPOINT;

    // app version check
    public static final String URL_CHECK_APP_VERSION = SERVER_URL + "/version";

    // user
    public static final String URL_CHECK_USER_INFO_DUPLICATION = SERVER_URL + "/check-info";
    public static final String URL_SIGN_UP = SERVER_URL + "/sign-up";
    public static final String URL_LOGIN = SERVER_URL + "/sign-in";
    public static final String URL_LOGOUT = SERVER_URL + "/sign-out";
    public static final String URL_CHANGE_USER_PW = SERVER_URL + "/reset-password";
    public static final String URL_USER_CHANGE_INFO = SERVER_URL + "/change-info";
    public static final String URL_FIND_USER_ID = SERVER_URL + "/find-id";
    public static final String URL_WITHDRAW_USER = SERVER_URL + "/withdrawal";
    public static final String URL_SET_AGREEMENT = SERVER_URL + "/set_agreement";
    public static final String URL_REFRESH_AUTH = SERVER_URL + "/refresh_auth";
}
