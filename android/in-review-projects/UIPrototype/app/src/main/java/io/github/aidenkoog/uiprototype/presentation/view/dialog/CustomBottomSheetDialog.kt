package io.github.aidenkoog.uiprototype.presentation.view.dialog

import android.content.Context
import android.content.DialogInterface
import android.graphics.Bitmap
import android.graphics.drawable.Drawable
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.bumptech.glide.request.target.CustomTarget
import com.bumptech.glide.request.transition.Transition
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import io.github.aidenkoog.uiprototype.databinding.CustomBottomSheetDialogBinding
import io.github.aidenkoog.uiprototype.extension.setOnSingleClickListener
import io.github.aidenkoog.uiprototype.util.image.DisplayUtil.dpToPx

class CustomBottomSheetDialog : BottomSheetDialogFragment() {
    private lateinit var binding: CustomBottomSheetDialogBinding

    private var cancelListener: (() -> Unit)? = null
    private var showListener: (() -> Unit)? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?,
    ): View = CustomBottomSheetDialogBinding.inflate(inflater, container, false).apply {
        binding = this
    }.root

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        initializeClickListeners()
        showListener?.invoke()
    }

    private fun initializeClickListeners() {
        binding.closeIconView.setOnSingleClickListener {
            dismiss()
        }
    }

    fun updateStates(list: MutableList<Any?>?): CustomBottomSheetDialog {
        //TODO:
        return this
    }

    private fun Context.bitmapFromImageUrl(imageUrl: String, callBack: (bitMap: Bitmap) -> Unit) {
        val requestOptions = RequestOptions().circleCrop()
        Glide.with(this).asBitmap().load(imageUrl).error {
            //TODO:
        }.override(dpToPx(this, 30), dpToPx(this, 30)).apply(requestOptions)
            .into(object : CustomTarget<Bitmap>() {
                override fun onResourceReady(
                    bitmapResource: Bitmap, transition: Transition<in Bitmap>?
                ) {
                    callBack(bitmapResource)
                }

                override fun onLoadCleared(placeholder: Drawable?) {
                }
            })
    }

    private fun loadHeaderImage(headerImageUrl: String) {
        context?.bitmapFromImageUrl(headerImageUrl) { bitMap: Bitmap ->
            binding.headerImg.setImageBitmap(bitMap)
        }
    }

    override fun onDismiss(dialog: DialogInterface) {
        cancelListener?.invoke()
        super.onDismiss(dialog)
    }

    fun registerInteraction(
        cancelListener: (() -> Unit)? = null,
        showListener: (() -> Unit)? = null,
    ) = apply {
        this.cancelListener = cancelListener
        this.showListener = showListener
    }

    companion object {
        const val TAG = "CustomBottomSheetDialogFragment"
    }
}
