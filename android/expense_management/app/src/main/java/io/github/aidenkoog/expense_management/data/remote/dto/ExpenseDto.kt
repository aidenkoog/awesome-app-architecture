package io.github.aidenkoog.expense_management.data.remote.dto

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class ExpenseDto (
    @SerializedName("amount")
    @Expose
    var amount: Double? = null,

    @SerializedName("customerName")
    @Expose
    var customerName: String? = null,

    @SerializedName("date")
    @Expose
    var date: String? = null,

    @SerializedName("type")
    @Expose
    var type: String? = null,

    @SerializedName("tripBudgetCategory")
    @Expose
    var tripBudgetCategory: String? = null,

    @SerializedName("currencyCode")
    @Expose
    var currencyCode: String? = null,

    @SerializedName("attachments")
    @Expose
    var attachments: List<Attachments>? = null,

    @SerializedName("description")
    @Expose
    var description: String? = null,

    @SerializedName("expenseVenueTitle")
    @Expose
    var expenseVenueTitle: String? = null


)
