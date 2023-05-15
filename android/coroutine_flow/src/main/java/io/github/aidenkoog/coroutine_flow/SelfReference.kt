package io.github.aidenkoog.coroutine_flow

import kotlin.properties.ReadOnlyProperty
import kotlin.reflect.KProperty

class SelfReference<T>(val value: T) : ReadOnlyProperty<Any?, T> {
    override fun getValue(thisRef: Any?, property: KProperty<*>): T = value
}

fun <T> selfReferenced(initializer: () -> T) = SelfReference(initializer())
