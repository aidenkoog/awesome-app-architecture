import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import RootContainer from './presentation/containers/root/RootContainer'
import store from './core/frameworks/redux'

export default function App() {
    return (
        <Provider store={store}>
            <RootContainer />
        </Provider>
    )
}