package io.github.aidenkoog.note_memo_app.feature_notes.domain.use_cases

import io.github.aidenkoog.note_memo_app.feature_notes.domain.model.Note
import io.github.aidenkoog.note_memo_app.feature_notes.domain.repository.NoteRepository
import io.github.aidenkoog.note_memo_app.feature_notes.domain.util.NoteOrder
import io.github.aidenkoog.note_memo_app.feature_notes.domain.util.OrderType
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

//All UseCase classes must have only 1 public fun each with the same name for each of them
class GetAllNotes(
    //referencing the repo interface type, not the impl, so as to be able to replace repositories
    private val repository: NoteRepository
) {
    //used so we can call our class as a function
    operator fun invoke(noteOrder: NoteOrder = NoteOrder.Date(OrderType.Descending)): Flow<List<Note>> {

        return repository.getAllNotes().map { notes ->
            when (noteOrder.orderType) {
                is OrderType.Ascending -> {
                    when (noteOrder) {
                        is NoteOrder.Title -> notes.sortedBy { it.title.lowercase() }
                        is NoteOrder.Date -> notes.sortedBy { it.timestamp }
                        is NoteOrder.Color -> notes.sortedBy { it.color }
                    }
                }
                is OrderType.Descending -> {
                    when (noteOrder) {
                        is NoteOrder.Title -> notes.sortedByDescending { it.title.lowercase() }
                        is NoteOrder.Date -> notes.sortedByDescending { it.timestamp }
                        is NoteOrder.Color -> notes.sortedByDescending { it.color }
                    }
                }
            }
        }
    }
}