import VideoFeed from "./VideoFeed";

const WELCOME_MESSAGE: string = "Hello World! AidenKooG! RTSP Streaming Test!"
const FEED_URL: string = "http://localhost:8083/stream/pattern/channel/0/hls/live/index.m3u8"

function App() {
  return <div className="app">
    {WELCOME_MESSAGE}
    <VideoFeed src={FEED_URL} />
  </div>;
}

export default App;