package io.github.aidenkoog.note_memo_app.feature_notes.domain.use_cases

import io.github.aidenkoog.note_memo_app.feature_notes.domain.model.InvalidNoteException
import io.github.aidenkoog.note_memo_app.feature_notes.domain.model.Note
import io.github.aidenkoog.note_memo_app.feature_notes.domain.repository.NoteRepository

class AddNote(private val repository : NoteRepository) {

    @Throws(InvalidNoteException::class)
    suspend operator fun invoke(note: Note){
            if(note.title.isBlank()){
                throw InvalidNoteException(message = "The title cannot be blank")
            }
            if(note.content.isBlank()){
                throw InvalidNoteException("Add content to the note")
            }
        repository.insertNote(note)
    }
}