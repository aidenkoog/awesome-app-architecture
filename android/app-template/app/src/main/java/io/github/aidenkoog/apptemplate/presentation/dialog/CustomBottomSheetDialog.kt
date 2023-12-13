package io.github.aidenkoog.apptemplate.presentation.dialog

import android.annotation.SuppressLint
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
import io.github.aidenkoog.apptemplate.R
import io.github.aidenkoog.apptemplate.databinding.CustomBottomSheetDialogBinding
import io.github.aidenkoog.apptemplate.extensions.setOnSingleClickListener
import io.github.aidenkoog.apptemplate.presentation.adapter.DetailListAdapter
import io.github.aidenkoog.apptemplate.utils.ImageUtil.dpToPx
import io.github.aidenkoog.apptemplate.utils.ImageUtil.getGlideUrl
import timber.log.Timber

class CustomBottomSheetDialog : BottomSheetDialogFragment() {

    private lateinit var binding: CustomBottomSheetDialogBinding

    private var cancelListener: (() -> Unit)? = null
    private var showListener: (() -> Unit)? = null

    private var detailList = ArrayList<ViewData>()
    private var myData: ViewData? = null
    private var totalCount: Int = 0

    private lateinit var detailListAdapter: DetailListAdapter

    data class ViewData(
        var name: String = "",
        var count: Int = 0,
    )

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?,
    ): View = CustomBottomSheetDialogBinding.inflate(inflater, container, false).apply {
        binding = this
    }.root

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        initializeDetailList()
        initializeClickListeners()

        showListener?.invoke()
    }

    private fun initializeClickListeners() = binding.closeIconView.setOnSingleClickListener {
        dismiss()
    }


    private fun initializeDetailList() {
        runCatching {
            detailListAdapter = DetailListAdapter(requireContext(), ArrayList())
            binding.detailList.adapter = detailListAdapter
        }.onFailure { e ->
            e.printStackTrace()
        }
    }

    /*
     * open method.
     */
    fun updateStates(list: MutableList<ViewData>): CustomBottomSheetDialog {
        parseAndSaveData(list)
        updateTotalCountUi()
        updateMyDataUi()
        goneAllDetailViews()
        updateDetailUi()
        return this
    }

    private fun updateTotalCountUi() {
        binding.countText.text = getCountText(totalCount)
    }

    @SuppressLint("SetTextI18n")
    private fun updateMyDataUi() {
        if (isMyDataEmpty()) {
            Timber.e("my data is empty (null)")
            handleMyDataException()
            return
        }
        Timber.d("my data exists")
        myData?.let {
            Timber.d("my data: $it")
            binding.name.text = "Unknown Name"
            binding.countText.text = getCountText(100000)

            context?.bitMapFromImgUrl(IMAGE_URL) { imageResource: Any? ->
                when (imageResource) {
                    is Bitmap -> binding.myProfileImgBg.setImageBitmap(imageResource)
                    is Drawable -> binding.myProfileImgBg.setImageDrawable(imageResource)
                }
            }
        }
    }

    private fun getCountText(count: Int): String = if (count > 1000) "100000" else count.toString()

    private fun isMyDataEmpty(): Boolean = myData == null

    private fun Context.bitMapFromImgUrl(
        imageUrl: String?, callBack: (imageResource: Any?) -> Unit,
    ) {
        val requestOptions = RequestOptions().circleCrop()
        Glide.with(this).asBitmap().load(getGlideUrl(imageUrl)).error(R.mipmap.ic_launcher)
            .override(dpToPx(this, 30), dpToPx(this, 30)).apply(requestOptions)
            .into(object : CustomTarget<Bitmap>() {
                override fun onResourceReady(
                    bitmapResource: Bitmap, transition: Transition<in Bitmap>?,
                ) = callBack(bitmapResource)

                override fun onLoadCleared(placeholder: Drawable?) {}
                override fun onLoadFailed(errorDrawable: Drawable?) {
                    callBack(errorDrawable)
                }
            })
    }

    private fun updateDetailUi() {
        if (detailList.size <= 0) {
            showDetailEmptyView()
            return
        }
        loadDetailStates()
        showDetailViews()
    }

    private fun resetStates() {
        totalCount = 0
        myData = null
        detailList.clear()
    }

    private fun parseAndSaveData(list: MutableList<ViewData>) {
        resetStates()
        detailList = list as ArrayList<ViewData>
        detailListAdapter.setItem(detailList)
    }

    private fun handleMyDataException() = Timber.e("handle exceptions !!!")

    private fun loadImageUrl(imageUrl: String?) =
        context?.bitMapFromImgUrl(imageUrl) { imageResource: Any? ->
            when (imageResource) {
                is Bitmap -> binding.myProfileImgBg.setImageBitmap(imageResource)
                is Drawable -> binding.myProfileImgBg.setImageDrawable(imageResource)
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

    private fun goneAllDetailViews() {
        binding.detailTitle.visibility = View.GONE
        binding.detailList.visibility = View.GONE
        binding.detailEmptyView.visibility = View.GONE
    }

    private fun loadDetailStates() = detailListAdapter.setItem(detailList)


    private fun showDetailViews() {
        binding.detailTitle.visibility = View.VISIBLE
        binding.detailList.visibility = View.VISIBLE
    }

    private fun showDetailEmptyView() {
        binding.detailEmptyView.visibility = View.VISIBLE
    }

    companion object {
        const val TAG = "CustomBottomSheetDialog"
        const val IMAGE_URL =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/220px-2010-kodiak-bear-1.jpg"
    }
}