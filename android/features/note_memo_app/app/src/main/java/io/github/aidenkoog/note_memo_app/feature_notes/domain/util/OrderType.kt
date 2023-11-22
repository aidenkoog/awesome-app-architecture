package io.github.aidenkoog.note_memo_app.feature_notes.domain.util

sealed class OrderType{
    object Ascending: OrderType()
    object Descending: OrderType()
}