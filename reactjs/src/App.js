import HomeContainer from "./presentation/container/HomeContainer"
import { RecoilRoot } from "recoil"

/**
 * App container.
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <RecoilRoot>
      <HomeContainer />
    </RecoilRoot>
  )
}

export default App
