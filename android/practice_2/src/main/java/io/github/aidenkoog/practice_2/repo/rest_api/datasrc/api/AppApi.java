package io.github.aidenkoog.practice_2.repo.rest_api.datasrc.api;

import io.github.aidenkoog.practice_2.repo.rest_api.listener.ResultListener;

public interface AppApi {
    void checkAppVersion(String os, ResultListener listener);
}
