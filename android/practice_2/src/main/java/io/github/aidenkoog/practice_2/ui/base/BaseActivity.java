package io.github.aidenkoog.practice_2.ui.base;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import io.github.aidenkoog.practice_2.di.DaggerDiComponent;
import io.github.aidenkoog.practice_2.di.DiComponent;
import io.github.aidenkoog.practice_2.di.DiModule;
import io.github.aidenkoog.practice_2.repo.mqtt.repos.MqttDataRepo;
import io.github.aidenkoog.practice_2.repo.rest_api.repos.detail.UserInfoRepo;

import javax.inject.Inject;
import io.paperdb.Paper;

public abstract class BaseActivity extends AppCompatActivity {
    protected Fragment mCurrentFragment;

    @Inject
    protected MqttDataRepo mMqttDataRepo;

    @Inject
    protected UserInfoRepo mUserInfoRepo;

    public MqttDataRepo getMqttDataRepo() {
        return mMqttDataRepo;
    }

    protected String mCurrentFragmentName;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mCurrentFragmentName = null;
        Paper.init(this);
        DiComponent component = DaggerDiComponent.builder()
                .diModule(new DiModule())
                .build();
        component.injectBase(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }
}