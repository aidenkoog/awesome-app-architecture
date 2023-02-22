package io.github.aidenkoog.android.presentation.photo

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.databinding.ViewDataBinding
import androidx.recyclerview.widget.RecyclerView
import io.github.aidenkoog.android.R
import io.github.aidenkoog.android.databinding.HolderPhotoBinding
import io.github.aidenkoog.android.domain.model.Photo
import io.github.aidenkoog.android.presentation.loadImage
import io.github.aidenkoog.android.presentation.photo.PhotosAdapter.PhotoViewHolder

internal class PhotosAdapter(val mListener: OnPhotosAdapterListener) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    private val photos: MutableList<Photo> = ArrayList()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val holderPhotoBinding = DataBindingUtil.inflate<ViewDataBinding>(
            LayoutInflater.from(parent.context), R.layout.holder_photo, parent, false
        )
        return PhotoViewHolder(holderPhotoBinding)
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        (holder as PhotoViewHolder).onBind(getItem(position))
    }

    private fun getItem(position: Int): Photo {
        return photos[position]
    }

    override fun getItemCount(): Int {
        return photos.size
    }

    @SuppressLint("NotifyDataSetChanged")
    fun addData(list: List<Photo>) {
        this.photos.clear()
        this.photos.addAll(list)
        notifyDataSetChanged()
    }

    inner class PhotoViewHolder(private val dataBinding: ViewDataBinding) :
        RecyclerView.ViewHolder(dataBinding.root) {

        fun onBind(photo: Photo) {
            val holderPhotoBinding = dataBinding as HolderPhotoBinding
            with(holderPhotoBinding) {
                photoViewModel = PhotoViewModel(photo)
                photoProgressBar.visibility = View.VISIBLE
                photoImageView.loadImage(photo.url, holderPhotoBinding.photoProgressBar)
            }

            itemView.setOnClickListener {
                mListener.gotoDetailPage(holderPhotoBinding.photoImageView, photo.id)
            }
        }
    }
}
