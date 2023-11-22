package io.github.aidenkoog.player_library.exo

import android.content.Context
import com.google.android.exoplayer2.ExoPlayer
import com.google.android.exoplayer2.Player

class KooExoPlayer(
    val context: Context,
) : Player.Listener {

    private var player: ExoPlayer? = null

    private fun initializePlayer() {
        if (player == null) {
            player = ExoPlayer.Builder(context.applicationContext).build()
            player?.addListener(this)
        }
    }

    override fun onPlayerStateChanged(playWhenReady: Boolean, playbackState: Int) {
        super.onPlayerStateChanged(playWhenReady, playbackState)
    }

    /**
     * Called when the value returned from [.getPlaybackState] changes.
     *
     *
     * [.onEvents] will also be called to report this event along with
     * other events that happen in the same [Looper] message queue iteration.
     *
     * @param playbackState The new playback [State].
     */
    override fun onPlaybackStateChanged(playbackState: Int) {
        super.onPlaybackStateChanged(playbackState)
    }
}