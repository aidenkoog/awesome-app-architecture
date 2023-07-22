package io.github.aidenkoog.aiden_template.presentation.ui.profile



sealed class ProfileEvent {

    object NewSearchEvent : ProfileEvent()

    object NextPageEvent : ProfileEvent()

    // restore after process death
    object RestoreStateEvent: ProfileEvent()
}