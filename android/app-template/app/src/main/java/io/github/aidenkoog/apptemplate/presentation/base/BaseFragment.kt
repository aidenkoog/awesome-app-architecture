package io.github.aidenkoog.apptemplate.presentation.base

import android.annotation.SuppressLint
import android.util.Log
import androidx.activity.OnBackPressedCallback
import androidx.fragment.app.Fragment
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable
import timber.log.Timber

abstract class BaseFragment : Fragment() {
    private val compositeDisposable = CompositeDisposable()

    /*
     * Register the callback related to back button press.
     * This method can be used
     * when it's necessary to execute the custom code after detecting back press event.
     */
    open fun registerBackPressedCallback() {
        val mBackPressedCallback: OnBackPressedCallback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                onHandleBackPressed() // custom code
            }
        }
        runCatching {
            requireActivity().onBackPressedDispatcher.addCallback(this, mBackPressedCallback)
        }.onFailure { e ->
            Timber.tag("backKey").e("registerBackPressedCallback: activity is null !!!")
            e.printStackTrace()
        }
    }

    /*
     * To be overrided in the concrete class.
     * Developer can put the custom logic here.
     */
    open fun onHandleBackPressed() = Timber.tag(javaClass.simpleName).d("onHandleBackPressed: ")

    /*
     * Simply execute onBackPressed instead of using the deprecated onBackPressed method.
     * Developer can use this if it's not necessary to put the custom code.
     */
    @SuppressLint("LogNotTimber")
    open fun backPressedWithDispatcher() {
        runCatching {
            requireActivity().onBackPressedDispatcher.onBackPressed()
        }.onFailure { e ->
            Log.e("backKey", "backPressedWithDispatcher: activity is null !!!")
            e.printStackTrace()
        }
    }

    override fun onDestroy() {
        clearDisposable()
        super.onDestroy()
    }

    override fun onStop() {
        if (!compositeDisposable.isDisposed) compositeDisposable.clear()
        super.onStop()
    }

    open fun add(disposable: Disposable) = compositeDisposable.add(disposable)

    open fun clearDisposable() = if (!compositeDisposable.isDisposed) {
        Timber.d("clear disposable")
        compositeDisposable.clear()
    } else {
        Timber.d("need not call clear method")
    }
}