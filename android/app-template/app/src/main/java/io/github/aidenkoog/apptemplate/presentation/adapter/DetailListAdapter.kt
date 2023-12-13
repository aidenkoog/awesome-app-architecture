package io.github.aidenkoog.apptemplate.presentation.adapter

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.graphics.drawable.Drawable
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.widget.AppCompatImageView
import androidx.appcompat.widget.AppCompatTextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.bumptech.glide.request.target.CustomTarget
import com.bumptech.glide.request.transition.Transition
import io.github.aidenkoog.apptemplate.R
import io.github.aidenkoog.apptemplate.presentation.dialog.CustomBottomSheetDialog
import io.github.aidenkoog.apptemplate.presentation.dialog.CustomBottomSheetDialog.Companion.IMAGE_URL
import io.github.aidenkoog.apptemplate.utils.ImageUtil.dpToPx
import io.github.aidenkoog.apptemplate.utils.ImageUtil.getGlideUrl

/*
 * legacy styled list adapter.
 * this adapter was made just for testing custom bottom sheet dialog.
 */
class DetailListAdapter(
    private val context: Context,
    private var detailList: MutableList<CustomBottomSheetDialog.ViewData>,
) : RecyclerView.Adapter<DetailListAdapter.ViewHolder>() {

    private var imageBgView: AppCompatImageView? = null

    private lateinit var nameTextView: AppCompatTextView
    private lateinit var countTextView: AppCompatTextView

    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        fun bind(position: Int) {
            loadImage(itemView, position)
            loadNameText(itemView, position)
            loadCountText(itemView, position)
        }
    }

    private fun loadImage(itemView: View, position: Int) {
        imageBgView = itemView.findViewById(R.id.image_bg)

        context.bitMapFromImgUrl(IMAGE_URL) { imageResource: Any? ->
            when (imageResource) {
                is Bitmap -> imageBgView?.setImageBitmap(imageResource)
                is Drawable -> imageBgView?.setImageDrawable(imageResource)
            }
        }
    }

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

    private fun loadNameText(itemView: View, position: Int) {
        nameTextView = itemView.findViewById(R.id.name)
        nameTextView.text = detailList[position].name
    }

    private fun loadCountText(itemView: View, position: Int) {
        countTextView = itemView.findViewById(R.id.count_text)
        countTextView.text = getCountText(detailList[position].count)
    }

    private fun getCountText(count: Int): String = if (count > 1000) "1000000" else count.toString()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val layoutInflater = LayoutInflater.from(context)
        val view = layoutInflater.inflate(
            R.layout.list_item_detail_popup, parent, false
        )
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(position)

    @SuppressLint("NotifyDataSetChanged")
    fun setItem(list: MutableList<CustomBottomSheetDialog.ViewData>) {
        detailList = list
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int = detailList.size
}