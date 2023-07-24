package io.github.aidenkoog.note_memo_app.feature_notes.presentation.notes_screen

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import io.github.aidenkoog.note_memo_app.feature_notes.domain.model.Note
import io.github.aidenkoog.note_memo_app.feature_notes.domain.use_cases.FeatureNotesUseCases
import io.github.aidenkoog.note_memo_app.feature_notes.domain.util.NoteOrder
import io.github.aidenkoog.note_memo_app.feature_notes.domain.util.OrderType
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class NotesViewModel @Inject constructor(
    private val notesUseCases: FeatureNotesUseCases
) : ViewModel() {

    private val _state = mutableStateOf(NotesState())
    val state: State<NotesState> = _state

    private var lastDeletedNote: Note? = null

    //
    private var getNotesJob : Job? = null

    init {
        getNotes(NoteOrder.Date(OrderType.Descending))
    }

    fun onEvent(event: NotesEvent) {
        when (event) {
            is NotesEvent.Order -> {

                if (//::class because we need to compare the classes not the references
                    state.value.noteOrder::class == event.noteOrder::class &&
                    //ascending or descending
                    state.value.noteOrder.orderType == event.noteOrder.orderType
                ) return
                getNotes(event.noteOrder)

            }
            is NotesEvent.DeleteNote -> {
                viewModelScope.launch {
                    notesUseCases.deleteNote(event.note)
                    lastDeletedNote = event.note
                }
            }
            is NotesEvent.RestoreNote -> {
                viewModelScope.launch {
                    notesUseCases.addNote(lastDeletedNote ?: return@launch)
                    lastDeletedNote = null
                }
            }
            is NotesEvent.ToggleOrderSection -> {
                _state.value = state.value.copy(
                    isOrderSectionVisible = !state.value.isOrderSectionVisible
                )
            }
        }

    }

    private fun getNotes(noteOrder: NoteOrder) {
        getNotesJob?.cancel()
        getNotesJob = notesUseCases.getAllNotes(noteOrder)
            //on each emission of a Note
            .onEach { notes ->
                _state.value = state.value.copy(
                    notes = notes,
            noteOrder = noteOrder
                )
            }.launchIn(viewModelScope)
    }
}