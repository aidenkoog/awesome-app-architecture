package io.github.aidenkoog.uiprototype.presentation.view.page

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import timber.log.Timber

open class BaseFragment : Fragment() {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Timber.i("onViewCreated: ")
        observeStates()
    }

    open fun observeStates() {
        Timber.i("observe states")
    }

    open fun finishActivity(): Unit = try {
        requireActivity().finish()
    } catch (e: IllegalStateException) {
        e.printStackTrace()
    }

    open fun finishApp(): Unit = try {
        requireActivity().finishAffinity()
    } catch (e: IllegalStateException) {
        e.printStackTrace()
    }
}