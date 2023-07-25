package io.github.aidenkoog.expense_management.domain.model

import android.os.Bundle
import android.os.Parcel
import android.os.Parcelable
import androidx.navigation.NavType
import com.google.gson.Gson


data class Expense (
    var amount: Double? = null,

    var customerName: String? = null,

    var date: String? = null,

    var type: String? = null,

    var tripBudgetCategory: String? = null,

    var currencyCode: String? = null,

    var receiptAttachment: String? = null,

    var description: String? = null,

    var expenseVenueTitle: String? = null

) : Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readValue(Double::class.java.classLoader) as? Double,
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        parcel.readString()
    ) {
    }

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeValue(amount)
        parcel.writeString(customerName)
        parcel.writeString(date)
        parcel.writeString(type)
        parcel.writeString(tripBudgetCategory)
        parcel.writeString(currencyCode)
        parcel.writeString(receiptAttachment)
        parcel.writeString(description)
        parcel.writeString(expenseVenueTitle)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<Expense> {
        override fun createFromParcel(parcel: Parcel): Expense {
            return Expense(parcel)
        }

        override fun newArray(size: Int): Array<Expense?> {
            return arrayOfNulls(size)
        }
    }
}

class AssetParamType : NavType<Expense>(isNullableAllowed = false) {
    override fun get(bundle: Bundle, key: String): Expense? {
        return bundle.getParcelable(key)
    }

    override fun parseValue(value: String): Expense {
        return Gson().fromJson(value, Expense::class.java)
    }

    override fun put(bundle: Bundle, key: String, value: Expense) {
        bundle.putParcelable(key, value)
    }
}
