package io.github.aidenkoog.android.presentation.intro.intro.fragment

import android.animation.Animator
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
import io.github.aidenkoog.android.R
import io.github.aidenkoog.android.databinding.FragmentSplashBinding
import io.github.aidenkoog.android.presentation.base.fragment.BaseFragment
import io.github.aidenkoog.android.presentation.intro.intro.viewmodel.SplashViewModel
import io.github.aidenkoog.android.util.LottieUtil

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
        setLottieAnimation()
        return viewDataBinding?.root!!
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Logger.d("onViewCreated:")
    }

    private fun setLottieAnimation() {
        val loadingImageView = viewDataBinding?.loadingSplashImageview!!
            LottieUtil.setLottieRawResource(
                loadingImageView,
                R.raw.splash_lottie
            )
        LottieUtil.addLottieAnimatorListener(loadingImageView, lottieAnimationListener)
        loadingImageView.let { LottieUtil.setLottieSpeed(it, 1.0f) }
        loadingImageView.let { LottieUtil.playLottie(it, 3000) }
    }

    private val lottieAnimationListener = object: LottieUtil.LottieAnimatorListener {
        override fun onAnimationStart(animator: Animator?) {
        }

        override fun onAnimationEnd(animator: Animator?) {
        }

        override fun onAnimationCancel(animator: Animator?) {
        }

        override fun onAnimationRepeat(animator: Animator?) {
        }

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