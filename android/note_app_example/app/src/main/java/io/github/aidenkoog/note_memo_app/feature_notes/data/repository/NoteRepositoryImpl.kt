package io.github.aidenkoog.note_memo_app.feature_notes.data.repository

import io.github.aidenkoog.note_memo_app.feature_notes.data.data_source.NoteDao
import io.github.aidenkoog.note_memo_app.feature_notes.domain.model.Note
import io.github.aidenkoog.note_memo_app.feature_notes.domain.repository.NoteRepository
import kotlinx.coroutines.flow.Flow

class NoteRepositoryImpl(
    private val  dao : NoteDao
) : NoteRepository {
    override fun getAllNotes(): Flow<List<Note>> {
        return dao.getAllNotes()
    }

    override suspend fun getNoteById(id: Int): Note? {
        return dao.getNoteById(id)
    }

    override suspend fun insertNote(note: Note) {
        dao.insertNote(note)
    }

    override suspend fun deleteNote(note: Note) {
        dao.deleteNote(note)
    }


}