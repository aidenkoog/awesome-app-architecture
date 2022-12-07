package io.github.aidenkoog.practice_2.repo.rest_api.errorcode;

public class RestApiError {
    public static final int ERROR_DEFAULT = 0;
    public static final int ERROR_PARAMETER_VALIDATION = ERROR_DEFAULT + 1;
    public static final int ERROR_AUTH_VALIDATION = ERROR_DEFAULT + 2;

    public static final int RESPONSE_SUCCESS = 200;
    public static final int RESPONSE_401 = 401;
    public static final int RESPONSE_402 = 402;
    public static final int RESPONSE_506 = 506;
    public static final int RESPONSE_503 = 503;
}
