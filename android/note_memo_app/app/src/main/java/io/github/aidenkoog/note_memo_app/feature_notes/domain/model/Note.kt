package io.github.aidenkoog.note_memo_app.feature_notes.domain.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import io.github.aidenkoog.note_memo_app.ui.theme.MildGreen
import io.github.aidenkoog.note_memo_app.ui.theme.GoldMetallic
import io.github.aidenkoog.note_memo_app.ui.theme.ImperialRed
import io.github.aidenkoog.note_memo_app.ui.theme.LightOrange
import io.github.aidenkoog.note_memo_app.ui.theme.Verdigris

@Entity
data class Note(
    val title: String,
    val content: String,
    val timestamp: Long,
    val color: Int,
    @PrimaryKey val id: Int? = null
) {
    companion object {
        val noteColors = listOf(ImperialRed, Verdigris, GoldMetallic, MildGreen, LightOrange)
    }
}

class InvalidNoteException(message: String) : Exception(message)
