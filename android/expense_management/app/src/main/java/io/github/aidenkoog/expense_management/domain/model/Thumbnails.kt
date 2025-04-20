package io.github.aidenkoog.expense_management.domain.model

import com.google.gson.annotations.SerializedName
import com.google.gson.annotations.Expose

data class Thumbnails (
    @SerializedName("full")
    @Expose
    var full: String? = null,

    @SerializedName("list")
    @Expose
    var list: String? = null
)