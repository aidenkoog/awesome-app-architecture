/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable default-param-last */

import { combineReducers } from 'redux';
import profile from './ProfileReducer';

const rootReducer = combineReducers({
    profile,
});

export default rootReducer;
