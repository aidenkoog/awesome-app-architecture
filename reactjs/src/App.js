import HomeContainer from "./presentation/container/HomeContainer"
import { RecoilRoot } from "recoil"

/**
 * App container.
 */
const App = () => {
  return (
    <RecoilRoot>
      <HomeContainer />
    </RecoilRoot>
  )
}

export default App
