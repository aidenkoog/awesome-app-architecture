package io.github.aidenkoog.note_memo_app.feature_notes.domain.repository

import io.github.aidenkoog.note_memo_app.feature_notes.domain.model.Note
import kotlinx.coroutines.flow.Flow

interface NoteRepository {

    fun getAllNotes() : Flow<List<Note>>

    suspend fun getNoteById(id :Int) : Note?

    suspend fun insertNote(note : Note)

    suspend fun deleteNote(note : Note)
}