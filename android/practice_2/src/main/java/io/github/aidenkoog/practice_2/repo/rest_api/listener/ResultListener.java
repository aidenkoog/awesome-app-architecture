package io.github.aidenkoog.practice_2.repo.rest_api.listener;

public interface ResultListener {
    void onFailure(int error);

    void onResponse(String response);
}