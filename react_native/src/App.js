import RootContainer from './presentation/containers/root/RootContainer'
import { RecoilRoot } from 'recoil'

export default function App() {
    return (
        <RecoilRoot>
            <RootContainer />
        </RecoilRoot>
    )
}