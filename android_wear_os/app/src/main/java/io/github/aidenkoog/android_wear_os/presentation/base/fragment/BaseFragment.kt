package io.github.aidenkoog.android_wear_os.presentation.base.fragment

import androidx.activity.OnBackPressedCallback
import androidx.fragment.app.Fragment
import com.orhanobut.logger.Logger
import io.github.aidenkoog.android_wear_os.presentation.base.activity.BaseActivity

open class BaseFragment : Fragment() {

    private lateinit var backPressedCallback: OnBackPressedCallback

    open fun showSnackBar(message: String) {
        (activity as BaseActivity).showSnackBar(message)
    }

    open fun finish() {
        requireActivity().finish()
    }

    open fun isNetworkStable(): Boolean {
        val networkConnected = (activity as BaseActivity).isNetworkConnected()
        Logger.d("networkConnected: $networkConnected")
        return networkConnected
    }

    open fun registerBackPressedCallback() {
        backPressedCallback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                onHandleBackPressed()
            }
        }
        requireActivity().onBackPressedDispatcher.addCallback(this, backPressedCallback)
    }

    open fun onHandleBackPressed() {
        Logger.d("onHandleBackPressed:")
    }
}