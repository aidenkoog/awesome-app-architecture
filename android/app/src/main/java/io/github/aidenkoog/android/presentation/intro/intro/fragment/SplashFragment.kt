package io.github.aidenkoog.android.presentation.intro.intro.fragment

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import com.orhanobut.logger.Logger
import io.github.aidenkoog.android.BR
import io.github.aidenkoog.android.databinding.FragmentSplashBinding
import io.github.aidenkoog.android.presentation.base.fragment.BaseFragment
import io.github.aidenkoog.android.presentation.intro.intro.viewmodel.SplashViewModel

class SplashFragment : BaseFragment() {

    private var viewDataBinding: FragmentSplashBinding? = null
    private val viewModelData: SplashViewModel? by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setDataObserver()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewDataBinding = FragmentSplashBinding.inflate(inflater, container, false)
        viewDataBinding?.setVariable(BR.splashViewModel, viewModelData)
        viewDataBinding?.executePendingBindings()
        return viewDataBinding?.root!!
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Logger.d("onViewCreated:")
    }

    fun movePlayStore() {
        try {
            startActivity(
                Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse("market://details?id=" + requireActivity().packageName)
                )
            )
        } catch (e: ActivityNotFoundException) {
            e.printStackTrace()
            startActivity(
                Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse("https://play.google.com/store/apps/details?id=" + requireActivity().packageName)
                )
            )
        }
    }

    private fun setDataObserver() {
        viewModelData?.isLoaded?.observe(this) { }

        viewModelData?.isError?.observe(this) { }
    }
}