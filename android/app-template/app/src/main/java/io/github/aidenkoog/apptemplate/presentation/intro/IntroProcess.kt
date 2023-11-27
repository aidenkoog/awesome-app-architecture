package io.github.aidenkoog.apptemplate.presentation.intro

/**
 * intro steps.
 */
sealed interface IntroSteps {
    data class ServerNotice(val url: String?) : IntroSteps
    data class ForcedUpdate(val latestVersion: String, val currentVersion: String) : IntroSteps

    data class OptionalUpdate(val latestVersion: String, val currentVersion: String) : IntroSteps

    object PermissionNotice : IntroSteps
    object LoginStep : IntroSteps
    object VersionCheckFailure : IntroSteps
}