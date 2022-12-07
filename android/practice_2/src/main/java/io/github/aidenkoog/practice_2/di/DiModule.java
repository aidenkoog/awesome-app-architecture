package io.github.aidenkoog.practice_2.di;

import io.github.aidenkoog.practice_2.repo.mqtt.repos.MqttDataRepo;
import io.github.aidenkoog.practice_2.repo.rest_api.repos.detail.*;

import dagger.Module;
import dagger.Provides;

@Module
public class DiModule {
    @Provides
    AppVersionChkRepo provideAppVersionChkRepo() {
        return AppVersionChkRepo.getInstance();
    }

    @Provides
    UserInfoRepo provideUserInfoRepo() {
        return UserInfoRepo.getInstance();
    }

    @Provides
    MqttDataRepo provideMqttDataRepo() {
        return MqttDataRepo.getInstance();
    }
}
