package io.github.aidenkoog.testapp.presentation.intro

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.orhanobut.logger.Logger
import io.github.aidenkoog.testapp.R
import io.github.aidenkoog.testapp.utils.DialogUtils.makeAlert
import io.github.aidenkoog.testapp.utils.PermissionUtils.checkAccessibilityPermission
import io.github.aidenkoog.testapp.utils.PermissionUtils.checkOverlayPermission
import io.github.aidenkoog.testapp.utils.PermissionUtils.moveToAccessibilitySettings
import io.github.aidenkoog.testapp.utils.PermissionUtils.moveToOverlaySettings

class IntroActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.overlay_layout2)

        /* Accessibility permission. */
        if (!checkAccessibilityPermission(activity = this)) {
            makeAlert(activity = this).setTitle(resources.getString(R.string.accessibility_popup_title))
                .setMessage(resources.getString(R.string.accessibility_popup_desc))
                .setNegativeButton(
                    resources.getString(R.string.accessibility_popup_btn_text)
                ) { _, _ -> moveToAccessibilitySettings(activity = this@IntroActivity) }.show()
        }

        /* Overlay view on other apps permission. */
        if (!checkOverlayPermission(activity = this)) {
            moveToOverlaySettings(activity = this)
        }
    }

    override fun onDestroy() {
        Logger.e("onDestroy:")
        super.onDestroy()
    }
}