package io.github.aidenkoog.coroutine_flow

import android.annotation.SuppressLint
import com.hoc081098.flowext.mapTo
import io.github.aidenkoog.coroutine_flow.databinding.ActivityMainBinding
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.merge

class MainRenderer(private val binding: ActivityMainBinding) {
    fun actionFlow(): Flow<MainAction> = merge(
        binding.startBtn.clicks().mapTo(MainAction.START),
        binding.pauseBtn.clicks().mapTo(MainAction.PAUSE),
        binding.clearBtn.clicks().mapTo(MainAction.RESET)
    )

    @SuppressLint("SetTextI18n")
    fun render(state: StopWatchState) {
        val mm = (state.seconds / 60).toString().padStart(2, '0')
        val ss = (state.seconds % 60).toString().padStart(2, '0')
        binding.textView.text = "$mm:$ss"

        when (state.watchState) {
            StopWatchState.WatchState.RUNNING -> {
                binding.startBtn.run {
                    isEnabled = false
                    text = resources.getString(R.string.start_btn_title)
                }
                binding.pauseBtn.isEnabled = true
                binding.clearBtn.isEnabled = true
            }

            StopWatchState.WatchState.PAUSED -> {
                binding.startBtn.run {
                    isEnabled = true
                    text = resources.getString(R.string.resume_btn_title)
                }
                binding.pauseBtn.isEnabled = false
                binding.clearBtn.isEnabled = true
            }

            StopWatchState.WatchState.IDLE -> {
                binding.startBtn.run {
                    isEnabled = true
                    text = resources.getString(R.string.start_btn_title)
                }
                binding.pauseBtn.isEnabled = false
                binding.clearBtn.isEnabled = false
            }
        }
    }
}