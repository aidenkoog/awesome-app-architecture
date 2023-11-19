package io.github.aidenkoog.android.testapp.ui;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface TestInterface {
    String name() default "";

    String description() default "";

    boolean runOnBackground() default false;
}
