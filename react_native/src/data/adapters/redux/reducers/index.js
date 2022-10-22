import { combineReducers } from 'redux';
import profile from './ProfileReducer';

const rootReducer = combineReducers({
    profile,
});

export default rootReducer;
