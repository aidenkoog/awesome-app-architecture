package io.github.aidenkoog.note_memo_app.feature_notes.presentation.add_edit_note_screen

data class NoteTextFieldState(
    val text: String = "",
    val hint: String = "",
    val isHintVisible: Boolean = true
)