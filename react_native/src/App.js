import RootContainer from './presentation/containers/root/RootContainer'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'

export default function App() {
    return (
        <RecoilRoot>
            <RecoilNexus/>
            <RootContainer />
        </RecoilRoot>
    )
}