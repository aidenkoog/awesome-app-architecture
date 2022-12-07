package io.github.aidenkoog.practice_2.repo.rest_api.core;

import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.rest_api.listener.ResultListener;

import org.json.JSONObject;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.EventListener;
import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Protocol;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import static io.github.aidenkoog.practice_2.repo.rest_api.errorcode.RestApiError.ERROR_AUTH_VALIDATION;
import static io.github.aidenkoog.practice_2.repo.rest_api.errorcode.RestApiError.ERROR_DEFAULT;
import static io.github.aidenkoog.practice_2.repo.rest_api.errorcode.RestApiError.RESPONSE_401;

public class HttpRequestImpl {

    private static final String PREFIX_MSG = "[HTTP-REQUEST]: ";
    public static int TIMEOUT_CONNECT = 30;
    public static int TIMEOUT_WRITE = 30;
    public static int TIMEOUT_READ = 30;

    private OkHttpClient mHttpClient;

    public HttpRequestImpl() {
        setUpHttpClient();
    }

    private void setUpHttpClient() {
        mHttpClient = new OkHttpClient.Builder()
                .retryOnConnectionFailure(true)
                .connectTimeout(TIMEOUT_CONNECT, TimeUnit.SECONDS)
                .writeTimeout(TIMEOUT_WRITE, TimeUnit.SECONDS)
                .readTimeout(TIMEOUT_READ, TimeUnit.SECONDS)
                .eventListener(new EventListener() {
                    @Override
                    public void connectFailed(Call call, InetSocketAddress inetSocketAddress,
                                              Proxy proxy, Protocol protocol, IOException ioe) {
                        super.connectFailed(call, inetSocketAddress, proxy, protocol, ioe);
                        mHttpClient = null;
                    }
                })
                .build();
    }

    private void setUpHttpClientTemp() {
        mHttpClient = new OkHttpClient.Builder()
                .connectTimeout(TIMEOUT_CONNECT, TimeUnit.SECONDS)
                .writeTimeout(TIMEOUT_WRITE, TimeUnit.SECONDS)
                .readTimeout(TIMEOUT_READ, TimeUnit.SECONDS)
                .build();
    }

    public void postJson(String url, JSONObject json, final ResultListener callback) {
        CustomLogger.i(PREFIX_MSG + "url >> " + url);

        if (mHttpClient == null) {
            setUpHttpClientTemp();
        }
        CustomLogger.d(PREFIX_MSG + "URL => " + url
                + " params => " + (json == null ? "null" : json.toString()));

        try {
            final Request request;
            if (json != null) {
                MediaType JSON = MediaType.parse("application/json; charset=utf-8");
                RequestBody body = RequestBody.create(JSON, json.toString());
                request = new Request.Builder().url(url).post(body).build();
            } else {
                request = new Request.Builder().url(url).build();
            }

            mHttpClient.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    CustomLogger.d(PREFIX_MSG + e.getMessage());
                    if (callback != null) {
                        callback.onFailure(ERROR_DEFAULT);
                    }
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    if (callback != null && response != null && response.body() != null) {
                        String strResponse = response.body().string();
                        CustomLogger.d(PREFIX_MSG + "Response => " + strResponse
                                + ", responseCode >> " + response.code());
                        callback.onResponse(strResponse);
                    }
                }
            });

        } catch (Exception e) {
            CustomLogger.d(PREFIX_MSG + e.getMessage());
            if (callback != null) {
                callback.onFailure(ERROR_DEFAULT);
            }

        }
    }

    public void postJson(String url, JSONObject json, Map<String, String> header,
                         final ResultListener callback) {
        CustomLogger.i(PREFIX_MSG + "url >> " + url);
        if (mHttpClient == null) {
            setUpHttpClientTemp();
        }
        CustomLogger.d(PREFIX_MSG + "URL => " + url
                + " params => " + (json == null ? "null" : json.toString())
                + ", header => " + (header == null ? "null" : header.toString()));

        try {
            final Request request;
            Headers headers = Headers.of(header);

            if (json != null) {
                MediaType JSON = MediaType.parse("application/json; charset=utf-8");
                RequestBody body = RequestBody.create(JSON, json.toString());
                request = new Request.Builder().headers(headers).url(url).post(body).build();
            } else {
                request = new Request.Builder().headers(headers).url(url).build();
            }

            mHttpClient.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    CustomLogger.e(PREFIX_MSG + e.getMessage());
                    if (callback != null) {
                        callback.onFailure(ERROR_DEFAULT);
                    }
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    if (callback != null && response != null && response.body() != null) {
                        String strResponse = response.body().string();
                        CustomLogger.e(PREFIX_MSG + "strResponse >> " + strResponse
                                + ", responseCode >> " + response.code());
                        callback.onResponse(strResponse);
                    }
                }
            });

        } catch (Exception e) {
            CustomLogger.d(PREFIX_MSG + e.getMessage());
            if (callback != null) {
                callback.onFailure(ERROR_DEFAULT);
            }
        }
    }

    public boolean postJsonExecute(String url, JSONObject json, Map<String, String> header,
                                   final ResultListener callback) {
        CustomLogger.i(PREFIX_MSG + "url >> " + url);
        final boolean[] returnValue = {true};

        if (mHttpClient == null) {
            setUpHttpClientTemp();
        }
        CustomLogger.d(PREFIX_MSG + "URL => " + url
                + "Params => " + (json == null ? "null" : json.toString()));

        try {
            final Request request;
            Headers headers = Headers.of(header);
            if (null != json) {
                MediaType JSON = MediaType.parse("application/json; charset=utf-8");
                RequestBody body = RequestBody.create(JSON, json.toString());
                request = new Request.Builder().headers(headers).url(url).post(body).build();
            } else {
                request = new Request.Builder().url(url).build();
            }

            mHttpClient.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    CustomLogger.d(PREFIX_MSG + e.getMessage());
                    if (callback != null) {
                        callback.onFailure(ERROR_DEFAULT);
                    }
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    if (callback != null && response != null && response.body() != null) {
                        String strResponse = response.body().string();
                        CustomLogger.e(PREFIX_MSG + "strResponse >> " + strResponse
                                + ", responseCode >> " + response.code());
                        if (response.code() == RESPONSE_401) {
                            CustomLogger.d(PREFIX_MSG + "Auth token is expired !!!");
                            callback.onFailure(ERROR_AUTH_VALIDATION);
                            returnValue[0] = false;
                        } else {
                            callback.onResponse(strResponse);
                        }
                    }
                }
            });

        } catch (Exception e) {
            CustomLogger.d(PREFIX_MSG + e.getMessage());
            if (callback != null) {
                callback.onFailure(ERROR_DEFAULT);
            }
        } finally {
            return returnValue[0];
        }
    }

    // synchronous
    public String postJsonExecuteRefresh(String url, JSONObject json) {
        String returnValue = "";
        if (mHttpClient == null) {
            setUpHttpClientTemp();
        }
        try {
            final Request request;
            if (json != null) {
                MediaType JSON = MediaType.parse("application/json; charset=utf-8");
                RequestBody body = RequestBody.create(JSON, json.toString());
                request = new Request.Builder().url(url).post(body).build();
            } else {
                request = new Request.Builder().url(url).build();
            }
            Response response = mHttpClient.newCall(request).execute();
            returnValue = response.body().string();

        } catch (Exception e) {
            CustomLogger.d(PREFIX_MSG + e.getMessage());
        } finally {
            return returnValue;
        }
    }
}