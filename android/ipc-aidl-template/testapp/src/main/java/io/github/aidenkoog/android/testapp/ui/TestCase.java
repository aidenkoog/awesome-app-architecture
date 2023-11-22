package io.github.aidenkoog.android.testapp.ui;

import android.annotation.SuppressLint;
import android.os.AsyncTask;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public abstract class TestCase {

    public final String name;
    public final String description;
    public final boolean runOnBackground;

    TestCase(String name, String description, boolean runOnBackground) {
        this.name = name;
        this.description = description;
        this.runOnBackground = runOnBackground;
    }

    protected abstract Object execute() throws Exception;

    @SuppressLint("StaticFieldLeak")
    public void execute(final OnSuccessListener onSuccess, final OnFailureListener onFailure) {
        if (runOnBackground) {
            new AsyncTask<Void, Void, Object>() {
                @Override
                protected Object doInBackground(Void... params) {
                    try {
                        return TestCase.this.execute();
                    } catch (Exception e) {
                        return e;
                    }
                }

                @Override
                protected void onPostExecute(Object o) {
                    if (o instanceof Exception) {
                        if (onFailure != null) onFailure.onFailure((Exception) o);
                    } else {
                        if (onSuccess != null) onSuccess.onSuccess(o);
                    }
                }
            }.execute();
        } else {
            try {
                Object result = execute();
                if (onSuccess != null) onSuccess.onSuccess(result);
            } catch (Exception e) {
                if (onFailure != null) onFailure.onFailure(e);
            }
        }
    }

    public interface OnSuccessListener {
        void onSuccess(Object object);
    }

    public interface OnFailureListener {
        void onFailure(Exception e);
    }


    public static List<TestCase> setup(final Object target) {

        List<TestCase> testCases = new ArrayList<>();
        for (final Method method : target.getClass().getDeclaredMethods()) {
            method.setAccessible(true);

            TestInterface testCase = method.getAnnotation(TestInterface.class);
            if (testCase == null) {
                continue;
            }
            if (method.getParameterTypes().length != 0) {
                continue;
            }

            String name;
            if (testCase.name().isEmpty()) {
                name = method.getName();
            } else {
                name = testCase.name();
            }

            TestCase item = new TestCase(name, testCase.description(), testCase.runOnBackground()) {
                @Override
                public Object execute() throws Exception {
                    return method.invoke(target);
                }
            };
            testCases.add(item);
        }
        return testCases;
    }
}