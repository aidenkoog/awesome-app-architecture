package io.github.aidenkoog.apptemplate.infrastructure.retrofit.annotation

import io.github.aidenkoog.apptemplate.infrastructure.retrofit.options.Url
import kotlin.reflect.KClass

/*
 * description of annotation retention.
 *
 * lifecycle, that is, it determines how long the annotation will remain alive.
 *
 * AnnotationRetention.RUNTIME
 * : annotations can be used up to runtime.
 * : the memory remains alive until the JVM configures the runtime environment
 * : from a class file containing Java bytecode and terminates the runtime.
 */
@Retention(AnnotationRetention.RUNTIME)
annotation class BaseUrl(val baseUrl: KClass<out Url>)