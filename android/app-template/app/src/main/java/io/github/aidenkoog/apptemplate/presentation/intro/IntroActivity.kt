package io.github.aidenkoog.apptemplate.presentation.intro

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.apptemplate.R
import io.github.aidenkoog.apptemplate.presentation.base.BaseActivity
import io.github.aidenkoog.apptemplate.presentation.home.MainActivity

@AndroidEntryPoint
class IntroActivity : BaseActivity() {

    private lateinit var viewModel: IntroViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.intro_main)

        viewModel = ViewModelProvider(this)[IntroViewModel::class.java]
        viewModel.startIntroSteps()

        /**
         * handle intro step events.
         */
        viewModel.introSteps.observe(this) { step: IntroSteps ->
            when (step) {
                is IntroSteps.LoginStep -> {
                    val intent = Intent(this, MainActivity::class.java).apply {
                        flags =
                            Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    }
                    startActivity(intent)
                    finish()
                }

                is IntroSteps.ForcedUpdate -> {
                    openPlayStore()
                }

                is IntroSteps.OptionalUpdate -> {
                    openPlayStore()
                }

                is IntroSteps.ServerNotice -> {}
                is IntroSteps.PermissionNotice -> {}
                is IntroSteps.VersionCheckFailure -> {}
            }
        }
    }

    /**
     * code which jumps to the play store app is to be arranged.
     */
    private fun openPlayStore() {
        var packageName = applicationContext.packageName

        /**
         * in common, developer uses suffix to distinguish build environment.
         * there is no any suffix in app in play store so it has to be replaced to empty string.
         */
        val suffixDev = ".dev"
        val suffixStage = ".stage"  // stage or qa or etc.

        packageName = if (packageName.endsWith(suffixDev)) {
            packageName.replace(suffixDev, "")

        } else if (packageName.endsWith(suffixStage)) {
            packageName.replace(suffixStage, "")

        } else {
            packageName
        }
        showPlayStore(packageName = packageName)
    }

    @SuppressLint("QueryPermissionsNeeded")
    private fun showPlayStore(packageName: String) {
        runCatching {
            startActivity(
                Intent(
                    Intent.ACTION_VIEW, Uri.parse(
                        "market://details?id=$packageName"
                    )
                )
            )
        }.onFailure { e ->
            e.printStackTrace()
            val intent = Intent(
                Intent.ACTION_VIEW, Uri.parse(
                    "https://play.google.com/store/apps/details?id=$packageName"
                )
            )
            if (intent.resolveActivity(packageManager) != null) {
                startActivity(intent)
            } else {
                // WebView
            }
        }.also {
            finish()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}