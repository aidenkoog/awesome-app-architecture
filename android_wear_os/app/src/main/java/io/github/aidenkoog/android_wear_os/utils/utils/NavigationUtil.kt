package io.github.aidenkoog.android_wear_os.utils.utils

import android.view.View
import androidx.navigation.findNavController

object NavigationUtil {
    fun navigateScreen(view: View?, action: Int) {
        view?.findNavController()?.navigate(action)
    }
}