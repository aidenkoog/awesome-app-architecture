package io.github.aidenkoog.expense_management.data.remote.dto

import com.google.gson.annotations.SerializedName
import com.google.gson.annotations.Expose

class Thumbnails {
    @SerializedName("full")
    @Expose
    var full: String? = null

    @SerializedName("list")
    @Expose
    var list: String? = null
}