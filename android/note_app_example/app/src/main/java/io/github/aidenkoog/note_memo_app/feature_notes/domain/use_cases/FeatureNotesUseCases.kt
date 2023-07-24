package io.github.aidenkoog.note_memo_app.feature_notes.domain.use_cases

data class FeatureNotesUseCases(
    val getAllNotes: GetAllNotes,
    val deleteNote: DeleteNote,
    val addNote: AddNote,
    val getNote: GetNote
)
