package io.github.aidenkoog.uiprototype.presentation.view.page.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import io.github.aidenkoog.uiprototype.R
import io.github.aidenkoog.uiprototype.presentation.view.page.BaseFragment
import io.github.aidenkoog.uiprototype.databinding.FmtHomeMainBinding
import io.github.aidenkoog.uiprototype.extension.setOnSingleClickListener
import io.github.aidenkoog.uiprototype.presentation.view.dialog.CustomBottomSheetDialog
import io.github.aidenkoog.uiprototype.presentation.viewmodel.HomeViewModel

class HomeFragment : BaseFragment() {

    private val binding: FmtHomeMainBinding by lazy {
        FmtHomeMainBinding.inflate(layoutInflater)
    }
    private val viewModel: HomeViewModel by lazy { HomeViewModel() }

    // Custom bottom sheet dialog fragment.
    private var customBottomSheetDialog: CustomBottomSheetDialog? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        binding.viewModel = viewModel

        return super.onCreateView(inflater, container, savedInstanceState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel.updateHomeState()
        binding.button.setOnSingleClickListener { showOrUpdateBottomSheetPopup(null) }
    }

    override fun observeStates() {
        super.observeStates()

        viewModel.homeState.observe(viewLifecycleOwner) {
            if (!it) return@observe
        }
    }

    private fun showOrUpdateBottomSheetPopup(list: MutableList<Any?>?) {
        if (customBottomSheetDialog != null && customBottomSheetDialog!!.isVisible) {
            customBottomSheetDialog!!.updateStates(list)
        } else {
            showBottomSheetDialog(list)
        }
    }

    private fun showBottomSheetDialog(list: MutableList<Any?>?) {
        try {
            customBottomSheetDialog = CustomBottomSheetDialog()
            customBottomSheetDialog?.let {
                it.registerInteraction(cancelListener = { /*TODO:*/ }, showListener = {
                    it.updateStates(list)
                })
                it.setStyle(
                    DialogFragment.STYLE_NORMAL, R.style.TransParentBottomSheetDialogTheme
                )
                it.show(
                    requireActivity().supportFragmentManager, CustomBottomSheetDialog.TAG
                )
            }
        } catch (e: IllegalStateException) {
            e.printStackTrace()
        }
    }
}