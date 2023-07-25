package io.github.aidenkoog.expense_management.domain.model

import com.google.gson.annotations.SerializedName
import com.google.gson.annotations.Expose


data class Attachments (
    @SerializedName("_id")
    @Expose
    var id: String? = null,

    @SerializedName("userId")
    @Expose
    var userId: String? = null,

    @SerializedName("filename")
    @Expose
    var filename: String? = null,

    @SerializedName("mime")
    @Expose
    var mime: String? = null,

    @SerializedName("size")
    @Expose
    var size: Int? = null,

    @SerializedName("original")
    @Expose
    var original: String? = null,

    @SerializedName("thumbnails")
    @Expose
    var thumbnails: Thumbnails? = null,

    @SerializedName("hash")
    @Expose
    var hash: String? = null
)