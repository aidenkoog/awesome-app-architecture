package io.github.aidenkoog.coroutine_flow

import android.view.View
import androidx.annotation.CheckResult
import androidx.fragment.app.Fragment
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import kotlinx.coroutines.Job
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.launch

@CheckResult
fun View.clicks(): Flow<Unit> = callbackFlow {
    setOnClickListener { trySend(Unit) }
    awaitClose { setOnClickListener(null) }
}

@Deprecated(
    message = "Should use Flow<T>.collectInViewLifecycle", replaceWith = ReplaceWith(
        "this.collectInViewLifecycle(owner, minActiveState, action)"
    ), level = DeprecationLevel.WARNING
)
@Suppress("unused")
inline fun <T> Flow<T>.collectIn(
    owner: Fragment,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    crossinline action: suspend (value: T) -> Unit,
) = collectIn(owner as LifecycleOwner, minActiveState, action)

@Suppress("unused")
inline fun <T> Flow<T>.collectIn(
    owner: LifecycleOwner,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    crossinline action: suspend (value: T) -> Unit,
): Job = owner.lifecycleScope.launch {
    owner.repeatOnLifecycle(state = minActiveState) { collect { action(it) } }
}

@Suppress("unused")
inline fun <T> Flow<T>.collectInViewLifecycle(
    fragment: Fragment,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    crossinline action: suspend (value: T) -> Unit,
): Job = collectIn(
    owner = fragment.viewLifecycleOwner, minActiveState = minActiveState, action = action
)