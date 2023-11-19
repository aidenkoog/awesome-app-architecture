import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'

import "./HomeComponent.css"
import packageInfo from '../../../../package.json'
import ReactPlayer from 'react-player'
import Duration from '../../components/Duration'
import { VIDEO_URL } from '../../../assets/strings/Strings'

const version = packageInfo.version;

class HomeContainer extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleOnPlaybackRateChange = (speed) => {
    this.setState({ playbackRate: parseFloat(speed) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    console.log('onProgress', state)
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  renderLoadButton = (url, label) => {
    return (
      <button className="control__btn" onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  ref = player => {
    this.player = player
  }

  render() {
    const {
      url, playing, controls, light, volume, muted, loop,
      played, loaded, duration, playbackRate, pip
    } = this.state

    return (
      <div className='app'>
        <section className='section'>

          <h2 style={{
            fontWeight: "bold", textAlign: "center", backgroundColor: "lightgray"
          }}>Video</h2>

          <div className='player-wrapper'>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.handlePlay}
              onEnablePIP={this.handleEnablePIP}
              onDisablePIP={this.handleDisablePIP}
              onPause={this.handlePause}
              onBuffer={() => console.log('onBuffer')}
              onPlaybackRateChange={this.handleOnPlaybackRateChange}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.handleEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          </div>

          <h2 style={{
            fontWeight: "bold", textAlign: "center", backgroundColor: "lightgray"
          }}>Controller</h2>

          <table>
            <tbody>
              <tr>
                <th>Controls:</th>
                <td>
                  <button onClick={this.handleStop}>Stop</button>
                  <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                  <button onClick={this.handleClickFullscreen}>Fullscreen</button>
                  {light &&
                    <button onClick={() => this.player.showPreview()}>Show preview</button>}
                  {ReactPlayer.canEnablePIP(url) &&
                    <button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>}
                </td>
              </tr>
              <tr>
                <th>Speed:</th>
                <td>
                  <button onClick={this.handleSetPlaybackRate} value={1}>1x</button>
                  <button onClick={this.handleSetPlaybackRate} value={1.5}>1.5x</button>
                  <button onClick={this.handleSetPlaybackRate} value={2}>2x</button>
                </td>
              </tr>
              <tr>
                <th>Seek:</th>
                <td>
                  <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
                </td>
              </tr>
              <tr>
                <th>Volume:</th>
                <td>
                  <input type='range' min={0} max={1} step='any'
                    value={volume} onChange={this.handleVolumeChange} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='controls'>Controls:</label>
                </th>
                <td>
                  <input id='controls' type='checkbox'
                    checked={controls} onChange={this.handleToggleControls} />
                  <em>&nbsp; Requires player reload</em>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='muted'>Muted:</label>
                </th>
                <td>
                  <input id='muted' type='checkbox'
                    checked={muted} onChange={this.handleToggleMuted} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='loop'>Loop:</label>
                </th>
                <td>
                  <input id='loop' type='checkbox'
                    checked={loop} onChange={this.handleToggleLoop} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='light'>Light Mode:</label>
                </th>
                <td>
                  <input id='light' type='checkbox'
                    checked={light} onChange={this.handleToggleLight} />
                </td>
              </tr>
              <tr>
                <th>Played:</th>
                <td><progress max={1} value={played} /></td>
              </tr>
              <tr>
                <th>Loaded:</th>
                <td><progress max={1} value={loaded} /></td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className='section'>

          <h2 style={{
            fontWeight: "bold", textAlign: "center", backgroundColor: "lightgray"
          }}>Video Category</h2>

          <table>
            <tbody>
              <tr>
                <th>YouTube:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.YOUTUBE.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.YOUTUBE.B, 'Test B')}
                  {this.renderLoadButton(VIDEO_URL.YOUTUBE.PL, 'Playlist')}
                </td>
              </tr>
              <tr>
                <th>SoundCloud:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.SOUND_CLOUD.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.SOUND_CLOUD.B, 'Test B')}
                  {this.renderLoadButton(VIDEO_URL.SOUND_CLOUD.PL, 'Playlist')}
                </td>
              </tr>
              <tr>
                <th>Facebook:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.FACEBOOK.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.FACEBOOK.B, 'Test B')}
                </td>
              </tr>
              <tr>
                <th>Vimeo:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.VIMEO.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.VIMEO.B, 'Test B')}
                </td>
              </tr>
              <tr>
                <th>Twitch:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.TWITCH.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.TWITCH.B, 'Test B')}
                  {this.renderLoadButton(VIDEO_URL.TWITCH.C, 'Test C')}
                </td>
              </tr>
              <tr>
                <th>Streamable:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.STREAMABLE.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.STREAMABLE.B, 'Test B')}
                </td>
              </tr>
              <tr>
                <th>Wistia:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.WISTIA.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.WISTIA.B, 'Test B')}
                  {this.renderLoadButton(VIDEO_URL.WISTIA.C, 'Test C')}
                </td>
              </tr>
              <tr>
                <th>DailyMotion:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.DAILYMOTION.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.DAILYMOTION.B, 'Test B')}
                </td>
              </tr>
              <tr>
                <th>Mixcloud:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.MIXCLOUD.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.MIXCLOUD.B, 'Test B')}
                </td>
              </tr>
              <tr>
                <th>Vidyard:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.VIDYARD.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.VIDYARD.B, 'Test B')}
                </td>
              </tr>
              <tr>
                <th>Kaltura:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.KALTURA.A, 'Test A')}
                  {this.renderLoadButton(VIDEO_URL.KALTURA.B, 'Test B')}
                </td>
              </tr>
              <tr>
                <th>Files:</th>
                <td>
                  {this.renderLoadButton(VIDEO_URL.FILES.MP4, 'mp4')}
                  {this.renderLoadButton(VIDEO_URL.FILES.WEBM, 'webm')}
                  {this.renderLoadButton(VIDEO_URL.FILES.OGV, 'ogv')}
                  {this.renderLoadButton(VIDEO_URL.FILES.MP3, 'mp3')}
                  <br />
                  {this.renderLoadButton(VIDEO_URL.FILES.HLS_M3U8, 'HLS (m3u8)')}
                  {this.renderLoadButton(VIDEO_URL.FILES.DASH_MPD, 'DASH (mpd)')}
                </td>
              </tr>
              <tr>
                <th>Custom URL:</th>
                <td>
                  <input ref={input => { this.urlInput = input }}
                    type='text' placeholder='Enter URL' />
                  <button onClick={() => this.setState(
                    { url: this.urlInput.value }
                  )}>Load</button>
                </td>
              </tr>
            </tbody>
          </table>

          <h2 style={{
            fontWeight: "bold", textAlign: "center", backgroundColor: "lightgray"
          }}>Video Play State</h2>
          <table>
            <tbody>
              <tr>
                <th>Video URL:</th>
                <td className={!url ? 'faded' : ''}>
                  {(url instanceof Array ? 'Multiple' : url) || 'null'}
                </td>
              </tr>
              <tr>
                <th>Playing:</th>
                <td>{playing ? 'true' : 'false'}</td>
              </tr>
              <tr>
                <th>Volume:</th>
                <td>{volume.toFixed(3)}</td>
              </tr>
              <tr>
                <th>Speed:</th>
                <td>{playbackRate}</td>
              </tr>
              <tr>
                <th>Played:</th>
                <td>{played.toFixed(3)}</td>
              </tr>
              <tr>
                <th>Loaded:</th>
                <td>{loaded.toFixed(3)}</td>
              </tr>
              <tr>
                <th>Duration:</th>
                <td><Duration seconds={duration} /></td>
              </tr>
              <tr>
                <th>Elapsed:</th>
                <td><Duration seconds={duration * played} /></td>
              </tr>
              <tr>
                <th>Remaining:</th>
                <td><Duration seconds={duration * (1 - played)} /></td>
              </tr>
            </tbody>
          </table>
        </section>
        <footer className='footer'>
          Version <strong>{version}</strong>
        </footer>
      </div>
    )
  }
}
export default hot(module)(HomeContainer)