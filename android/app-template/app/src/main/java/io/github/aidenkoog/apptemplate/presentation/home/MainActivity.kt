package io.github.aidenkoog.apptemplate.presentation.home

import android.os.Bundle
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.DialogFragment
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.apptemplate.R
import io.github.aidenkoog.apptemplate.databinding.HomeMainBinding
import io.github.aidenkoog.apptemplate.extensions.setOnSingleClickListener
import io.github.aidenkoog.apptemplate.presentation.base.BaseActivity
import io.github.aidenkoog.apptemplate.presentation.dialog.CustomBottomSheetDialog
import io.github.aidenkoog.apptemplate.presentation.dialog.DialogFactory
import timber.log.Timber

@AndroidEntryPoint
class MainActivity : BaseActivity() {

    private lateinit var binding: HomeMainBinding

    private var customBottomSheetDialog: CustomBottomSheetDialog? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        /*
         * data binding with layout in which layout tag exists.
         */
        binding = DataBindingUtil.setContentView<HomeMainBinding>(
            this, R.layout.home_main
        ).also {
            setContentView(it.root)
        }

        /*
         * custom single click listener for handling continuous key events.
         */
        binding.homeBtn.setOnSingleClickListener {
            showToast(getString(R.string.btn_click_test_toast_msg))
            handleHomeBtnEvents()
        }

        /*
         * set sub text title using data binding.
         */
        binding.viewData = ViewData(message = "Test Sub Title Text !!!")
    }

    private fun handleHomeBtnEvents() {
        // 1) dialog factory test code.
        val dialogBuilder = DialogFactory.Builder(this)
        val dialog = dialogBuilder.setTitle("Test Title").setPositiveButton().create()
        dialog.show()

        // 2) custom bottom sheet dialog test code.
        val list = getViewDataList()
        if (customBottomSheetDialog != null && customBottomSheetDialog!!.isVisible) {
            customBottomSheetDialog!!.updateStates(list)
        } else {
            showBottomSheetDialog(list)
        }
    }

    private fun showBottomSheetDialog(list: MutableList<CustomBottomSheetDialog.ViewData>) {
        kotlin.runCatching {
            customBottomSheetDialog = CustomBottomSheetDialog()
            customBottomSheetDialog?.let {
                it.registerInteraction(cancelListener = {
                    Timber.d("canceled")

                }, showListener = {
                    Timber.d("showed")
                    it.updateStates(list)
                })
                it.setStyle(
                    DialogFragment.STYLE_NORMAL, R.style.TransParentBottomSheetDialogTheme
                )
                it.show(supportFragmentManager, CustomBottomSheetDialog.TAG)
            }
        }.onFailure { e -> e.printStackTrace() }
    }

    private fun getViewDataList(): MutableList<CustomBottomSheetDialog.ViewData> {
        val list = ArrayList<CustomBottomSheetDialog.ViewData>()
        list.add(CustomBottomSheetDialog.ViewData("TEST1", 100))
        list.add(CustomBottomSheetDialog.ViewData("TEST2", 101))
        list.add(CustomBottomSheetDialog.ViewData("TEST3", 102))
        list.add(CustomBottomSheetDialog.ViewData("TEST4", 103))
        list.add(CustomBottomSheetDialog.ViewData("TEST5", 104))
        return list
    }

    data class ViewData(
        val message: String = "",
    )
}