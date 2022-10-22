import { takeEvery, put } from 'redux-saga/effects';
import allAction from '../actions/index';

function dummyFunction() {
    return true;
}

function* saveProfile() {
    try {
        const result = dummyFunction();
        yield put(allAction.saveProfileSuccess(result));
    } catch (error) {
        yield put(allAction.saveProfileFailure(error));
    }
}

function* rootSaga() {
    yield takeEvery('SAVE_PROFILE', saveProfile);
}

export default rootSaga;
