package io.github.aidenkoog.practice_2.repo.rest_api.repos.detail;

import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.rest_api.repos.base.RestApiRepo;
import io.github.aidenkoog.practice_2.repo.rest_api.datasrc.DataSource;
import io.github.aidenkoog.practice_2.repo.rest_api.datasrc.DataSourceImpl;
import io.github.aidenkoog.practice_2.repo.rest_api.listener.ResultListener;

import static io.github.aidenkoog.practice_2.repo.rest_api.errorcode.RestApiError.ERROR_PARAMETER_VALIDATION;

import android.os.Bundle;

public class AppVersionChkRepo extends RestApiRepo {
    private final DataSource mServiceDataSource = new DataSourceImpl();

    private static final class AppVersionChkRepoHolder {
        public static final AppVersionChkRepo INSTANCE = new AppVersionChkRepo();
    }

    public static AppVersionChkRepo getInstance() {
        return AppVersionChkRepoHolder.INSTANCE;
    }

    @Override
    protected String getSequenceId() {
        return super.getSequenceId();
    }

    @Override
    protected String getTag() {
        return AppVersionChkRepo.class.getSimpleName();
    }

    @Override
    protected int getPid() {
        return super.getPid();
    }

    @Override
    protected Bundle command(String command, Bundle params) {
        CustomLogger.entry();
        return mServiceDataSource.command(command, params);
    }

    private AppVersionChkRepo() {
        super();
    }

    @Override
    protected void notifyParamError(ResultListener listener) {
        listener.onFailure(ERROR_PARAMETER_VALIDATION);
    }

    public void checkAppVersion(String os, ResultListener listener) {
        if (hasValidParam(OP_AND, os)) {
            mServiceDataSource.checkAppVersion(os, listener);
        }
    }
}