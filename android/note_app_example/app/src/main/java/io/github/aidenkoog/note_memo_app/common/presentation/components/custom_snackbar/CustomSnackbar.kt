package io.github.aidenkoog.note_memo_app.common.presentation.components.custom_snackbar

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarData
import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.SnackbarVisuals
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import io.github.aidenkoog.note_memo_app.ui.theme.LightGreen
import kotlinx.coroutines.launch
import java.util.Locale

//Using Material 3
@Composable
fun CustomSnackbar(
    snackbarData: SnackbarData,
    modifier: Modifier = Modifier,
    surfaceColor: Color = MaterialTheme.colorScheme.surface,
    textColor: Color = MaterialTheme.colorScheme.onSurface,
    actionTextColor: Color = MaterialTheme.colorScheme.primary,
    borderColor: Color = MaterialTheme.colorScheme.primary
) {
    val visuals = snackbarData.visuals

    Surface(
        shape = MaterialTheme.shapes.medium,
        color = surfaceColor,
        modifier = modifier,
        border = BorderStroke(5.dp, color = borderColor)

    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column(modifier = Modifier.weight(3f)) {
                Text(
                    text = visuals.message,
                    color = textColor,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
            }
            visuals.actionLabel?.let {
                Column(modifier = Modifier.weight(1f)) {
                    TextButton(
                        onClick = { snackbarData.performAction() },
                        modifier = Modifier.align(Alignment.CenterHorizontally)

                    ) {
                        Text(
                            text = it.uppercase(Locale.ROOT), color = actionTextColor,
                        )
                    }
                }
            }
        }
    }
}


/** Underneath is stuff for previews*/

private object FakeVisuals : SnackbarVisuals {
    override val actionLabel
        get() = """Sample
            |Action""".trimMargin()
    override val duration: SnackbarDuration
        get() = SnackbarDuration.Short
    override val message: String
        get() = "Sample text"
    override val withDismissAction: Boolean
        get() = false
}

private object FakeSnackbarData : SnackbarData {
    override val visuals: SnackbarVisuals
        get() = FakeVisuals

    override fun dismiss() {
    }

    override fun performAction() {
    }
}


@Composable
private fun CustomSnackbarExample(isSemiTransparent: Boolean = false) {
    CustomSnackbar(
        snackbarData = FakeSnackbarData,
        modifier = Modifier.padding(horizontal = 30.dp, vertical = 15.dp),
        textColor = Color.White,
        actionTextColor = LightGreen,
        surfaceColor = if (isSemiTransparent) Color.DarkGray.copy(alpha = 0.5f) else Color.DarkGray,
        borderColor = if (isSemiTransparent) LightGreen.copy(alpha = 0.8f) else LightGreen
    )
}

@Preview(showBackground = true)
@Composable
private fun CustomSnackbarPreview() {
    CustomSnackbarExample()
}


@Preview(showBackground = false)
@Composable
//Added 2 SnackbarHosts at the top and at the bottom for fun
private fun CustomSnackbarWithButtonPreview() {
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }
    val mildOrange = Color(0xFFFA9A3A)

    Scaffold(modifier = Modifier.padding(0.dp)) { padding ->
        Surface(
            modifier = Modifier
                .padding(padding)
                .fillMaxSize(), color = mildOrange
        ) {
            Box(modifier = Modifier.fillMaxSize()) {
                SnackbarHost(
                    hostState = snackbarHostState, modifier = Modifier.align(Alignment.TopCenter)
                ) {
                    CustomSnackbarExample(isSemiTransparent = true)
                }
                TextButton(
                    onClick = { scope.launch { snackbarHostState.showSnackbar(visuals = FakeVisuals) } },
                    modifier = Modifier.align(
                        Alignment.Center
                    ),
                    colors = ButtonDefaults.textButtonColors(
                        containerColor = Color.White, contentColor = Color.DarkGray
                    )
                ) {
                    Text(text = "Test snackbar")
                }
                SnackbarHost(
                    hostState = snackbarHostState, modifier = Modifier.align(Alignment.BottomCenter)
                ) {
                    CustomSnackbarExample()
                }
            }
        }
    }

}
