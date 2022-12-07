package io.github.aidenkoog.practice_2.ui.splash;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

import io.github.aidenkoog.practice_2.di.DaggerDiComponent;
import io.github.aidenkoog.practice_2.di.DiComponent;
import io.github.aidenkoog.practice_2.di.DiModule;
import io.github.aidenkoog.practice_2.logging.CustomLogger;
import io.github.aidenkoog.practice_2.repo.rest_api.repos.detail.AppVersionChkRepo;
import io.paperdb.Paper;

import javax.inject.Inject;

public class SplashActivity extends Activity {

    @Inject
    public AppVersionChkRepo mAppVersionChkRepo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(null);
        initDi();
        initPaper();
    }

    private void initDi() {
        DiComponent component = DaggerDiComponent.builder()
                .diModule(new DiModule())
                .build();
        component.injectSplash(this);
    }

    private void initPaper() {
        Paper.init(this);
        Paper.book().write("deviceId", "");
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (getIntent().getBooleanExtra("BACK", false) == true) {
            onBackPressed();
            return;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        CustomLogger.d("requestCode => " + requestCode + ", resultCode => " + resultCode);
    }
}