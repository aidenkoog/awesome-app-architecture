package io.github.aidenkoog.note_memo_app.feature_notes.presentation.notes_screen

import io.github.aidenkoog.note_memo_app.feature_notes.domain.model.Note
import io.github.aidenkoog.note_memo_app.feature_notes.domain.util.NoteOrder
import io.github.aidenkoog.note_memo_app.feature_notes.domain.util.OrderType

data class NotesState(
    val notes: List<Note> = emptyList(),
    val noteOrder : NoteOrder = NoteOrder.Date(OrderType.Descending),
    val isOrderSectionVisible : Boolean = false
)
