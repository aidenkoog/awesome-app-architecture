package io.github.aidenkoog.note_memo_app.feature_notes.domain.use_cases

import io.github.aidenkoog.note_memo_app.feature_notes.domain.model.Note
import io.github.aidenkoog.note_memo_app.feature_notes.domain.repository.NoteRepository

class DeleteNote(
    private val repository: NoteRepository
) {
    suspend operator fun invoke(note: Note) = repository.deleteNote(note)
}