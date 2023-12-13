package io.github.aidenkoog.apptemplate.presentation.base

import androidx.lifecycle.ViewModel
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable

/*
 * base viewmodel for rx.
 * disposable object is controlled in this class.
 */
abstract class BaseDisposableViewModel : ViewModel() {

    private val compositeDisposable = CompositeDisposable()

    fun add(disposable: Disposable?) {
        disposable?.let {
            compositeDisposable.add(it)
        }
    }

    /*
     * onCleared is called when activity is destroyed to make new configuration again.
     *
     * onDestroy event is invoked -> is it for making new configuration?
     * -> obtain ViewModelStore with getViewModelStore -> call clear()
     */
    override fun onCleared() {
        disposeClear()
        super.onCleared()
    }

    fun Disposable.disposeOnCleared() {
        compositeDisposable.add(this)
    }

    private fun disposeClear() {/*
         * call clear method if compositeDisposable is not disposed yet.
         */
        if (!compositeDisposable.isDisposed) compositeDisposable.clear()
    }
}