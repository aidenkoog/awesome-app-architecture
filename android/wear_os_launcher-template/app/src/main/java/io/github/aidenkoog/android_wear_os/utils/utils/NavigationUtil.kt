package io.github.aidenkoog.android_wear_os.utils.utils

import android.view.View
import androidx.navigation.findNavController
import com.orhanobut.logger.Logger

object NavigationUtil {
    private fun canNavigate(view: View?): Boolean {
        if (view == null) {
            Logger.e("view to navigate is null !!!")
            return false
        }
        return true
    }

    fun navigateScreen(view: View?, action: Int) {
        if (!canNavigate(view)) {
            return
        }
        view!!.findNavController().navigate(action)
    }

    fun popBackStack(view: View?) {
        if (!canNavigate(view)) {
            return
        }
        view!!.findNavController().popBackStack()
    }
}