package io.github.aidenkoog.testapp.utils

import android.animation.Animator
import android.view.View
import android.widget.ImageView
import com.airbnb.lottie.LottieAnimationView
import com.airbnb.lottie.RenderMode
import com.orhanobut.logger.Logger
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

object LottieUtil {

    fun setLottieRawResource(view: LottieAnimationView, rawRes: Int) {
        view.setAnimation(rawRes)
    }

    fun setLottieRenderMode(view: LottieAnimationView, renderMode: RenderMode) {
        view.renderMode = renderMode
    }

    fun playLottie(view: LottieAnimationView) {
        view.visibility = View.VISIBLE
        view.playAnimation()
    }

    fun playLottie(view: LottieAnimationView, duration: Long) {
        view.playAnimation()
        CoroutineScope(Dispatchers.IO).launch {
            withContext(Dispatchers.IO) {
                Thread.sleep(duration)
            }
            CoroutineScope(Dispatchers.Main).launch {
                view.cancelAnimation()
                view.visibility = View.INVISIBLE
            }
        }
    }

    fun pauseLottie(view: LottieAnimationView) {
        view.pauseAnimation()
    }

    fun cancelLottie(view: LottieAnimationView) {
        Logger.d("cancelLottie!")
        view.cancelAnimation()
        view.visibility = View.INVISIBLE
    }

    fun cancelLottieWithInvisible(view: LottieAnimationView) {
        view.cancelAnimation()
        view.visibility = View.INVISIBLE
    }

    fun setLottieRepeatCount(view: LottieAnimationView, repeatCount: Int) {
        view.repeatCount = repeatCount
    }

    fun setLottieSpeed(view: LottieAnimationView, speed: Float) {
        view.speed = speed
    }

    fun getLottieSpeed(view: LottieAnimationView): Float {
        return view.speed
    }

    fun setScaleType(view: LottieAnimationView, scaleType: ImageView.ScaleType) {
        view.scaleType = scaleType
    }

    fun isLottieAnimating(view: LottieAnimationView): Boolean {
        return view.isAnimating
    }

    interface LottieAnimatorListener {
        fun onAnimationStart(animator: Animator?)
        fun onAnimationEnd(animator: Animator?)
        fun onAnimationCancel(animator: Animator?)
        fun onAnimationRepeat(animator: Animator?)
    }

    fun addLottieAnimatorListener(view: LottieAnimationView, listener: LottieAnimatorListener?) {
        view.addAnimatorListener(object : Animator.AnimatorListener {
            override fun onAnimationStart(animator: Animator) {
                Logger.i("Lottie animation is started")
                listener?.onAnimationStart(animator)
            }

            override fun onAnimationEnd(animator: Animator) {
                Logger.i("Lottie animation is ended")
                listener?.onAnimationEnd(animator)
            }

            override fun onAnimationCancel(animator: Animator) {
                Logger.i("Lottie animation is canceled")
                listener?.onAnimationCancel(animator)
            }

            override fun onAnimationRepeat(animator: Animator) {
                Logger.i("Lottie animation is repeated")
                listener?.onAnimationRepeat(animator)
            }
        })
    }
}