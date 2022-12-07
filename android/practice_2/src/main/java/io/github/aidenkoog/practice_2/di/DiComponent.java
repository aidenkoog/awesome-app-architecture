package io.github.aidenkoog.practice_2.di;

import io.github.aidenkoog.practice_2.ui.base.BaseActivity;
import io.github.aidenkoog.practice_2.ui.splash.SplashActivity;

import dagger.Component;

@Component(modules = DiModule.class)
public interface DiComponent {
    void injectBase(BaseActivity activity);

    void injectSplash(SplashActivity activity);
}
