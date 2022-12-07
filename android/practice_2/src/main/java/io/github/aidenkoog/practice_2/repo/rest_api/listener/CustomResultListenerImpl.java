package io.github.aidenkoog.practice_2.repo.rest_api.listener;

import io.github.aidenkoog.practice_2.logging.CustomLogger;

import org.json.JSONObject;

import static io.github.aidenkoog.practice_2.repo.rest_api.errorcode.RestApiError.ERROR_AUTH_VALIDATION;

public class CustomResultListenerImpl implements ResultListener {
    public interface OnRetryAuthListener {
        void onRetry(String url, JSONObject params, ResultListener listener);
    }

    private OnRetryAuthListener mOnRetryAuthListener;
    private ResultListener mListener;
    private JSONObject mParams;
    private String mUrl;

    public CustomResultListenerImpl() {
        CustomLogger.entry();
    }

    public CustomResultListenerImpl addParams(JSONObject params) {
        mParams = params;
        return this;
    }

    public CustomResultListenerImpl addUrl(String url) {
        mUrl = url;
        return this;
    }

    public CustomResultListenerImpl addOnResultListener(ResultListener listener) {
        mListener = listener;
        return this;
    }

    public CustomResultListenerImpl addOnRetryAuthListener(OnRetryAuthListener listener) {
        mOnRetryAuthListener = listener;
        return this;
    }

    @Override
    public void onFailure(int error) {
        if (error == ERROR_AUTH_VALIDATION) {
            mOnRetryAuthListener.onRetry(mUrl, mParams, mListener);
        } else {
            mListener.onFailure(error);
        }
    }

    @Override
    public void onResponse(String response) {
        mListener.onResponse(response);
    }
}
