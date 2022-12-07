package io.github.aidenkoog.style1.viewmodel;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModel;

import java.io.Closeable;

import io.github.aidenkoog.style1.navigator.BaseNavigator;

public class BaseViewModel<N extends BaseNavigator> extends ViewModel {
    public BaseViewModel() {
        super();
    }

    public BaseViewModel(@NonNull Closeable... closeables) {
        super(closeables);
    }

    @Override
    public void addCloseable(@NonNull Closeable closeable) {
        super.addCloseable(closeable);
    }

    @Override
    protected void onCleared() {
        super.onCleared();
    }
}