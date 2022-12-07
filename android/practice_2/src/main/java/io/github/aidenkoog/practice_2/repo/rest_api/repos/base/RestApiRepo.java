package io.github.aidenkoog.practice_2.repo.rest_api.repos.base;

import android.os.Bundle;
import android.text.TextUtils;

import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.rest_api.listener.ResultListener;

import java.util.Random;

public abstract class RestApiRepo {
    private static final String PREFIX_MSG = "[REST-API-REPO]: ";
    private static final int RANDOM_INT_BOUND = 100000000;
    private Random mRandom;

    protected abstract String getTag();

    protected int getPid() {
        return android.os.Process.myPid();
    }

    protected abstract Bundle command(String command, Bundle params);

    public RestApiRepo() {
        CustomLogger.i(PREFIX_MSG + getTag());
        mRandom = new Random();
    }

    protected String getSequenceId() {
        return "SEQ" + mRandom.nextInt(RANDOM_INT_BOUND);
    }

    protected abstract void notifyParamError(ResultListener listener);

    protected final String OP_OR = "or";
    protected final String OP_AND = "and";

    protected boolean hasValidParam(String op, String... params) {
        if (params == null || params.length <= 0) {
            return false;
        }
        int paramLen = params.length;
        for (int i = 0; i < paramLen; i++) {
            CustomLogger.d(PREFIX_MSG + "param[" + i + "] => " + params[i]);
        }
        int paramInvalidCount = 0;
        for (String param : params) {
            if (TextUtils.isEmpty(param)) {
                if (OP_OR.equals(op)) {
                    return false;
                } else {
                    paramInvalidCount++;
                }
            }
        }
        if (OP_AND.equals(op)) {
            return paramLen != paramInvalidCount;
        }
        return true;
    }
}
