package io.github.aidenkoog.note_memo_app.feature_notes.presentation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import io.github.aidenkoog.note_memo_app.feature_notes.presentation.add_edit_note_screen.AddEditNoteScreen
import io.github.aidenkoog.note_memo_app.feature_notes.presentation.notes_screen.NotesScreen
import io.github.aidenkoog.note_memo_app.feature_notes.presentation.util.Screen
import io.github.aidenkoog.note_memo_app.ui.theme.NoteAppTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContent {
            NoteAppTheme {
                Surface(color = MaterialTheme.colorScheme.background) {
                    val navController = rememberNavController()
                    NavHost(
                        navController = navController, startDestination = Screen.NotesScreen.route
                    ) {
                        composable(route = Screen.NotesScreen.route) {
                            NotesScreen(navController = navController)
                        }
                        composable(
                            route = Screen.AddEditNoteScreen.route + "?noteId={noteId}&noteColor={noteColor}",
                            arguments = listOf(navArgument("noteId") {
                                type = NavType.IntType
                                defaultValue = -1
                            }, navArgument("noteColor") {
                                type = NavType.IntType
                                defaultValue = -1
                            })

                        ) {
                            val color = it.arguments?.getInt("noteColor") ?: -1
                            AddEditNoteScreen(navController = navController, noteColor = color)
                        }

                    }
                }

            }
        }


    }
}