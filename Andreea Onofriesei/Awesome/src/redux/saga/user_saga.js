import * as firebase from 'firebase';
import { select, call, put, take } from 'redux-saga/effects'
import * as ActionTypes from './../actionTypes'
export function* loginWithEmail(action) {
    try {
        const state = yield select();

        const response = yield call(firebase.User.loginWithEmail, action);
        console.log('User Saga Response', JSON.stringify(response));
        yield put({ type: ActionTypes.LOGIN_SUCCESS, response })
    } catch (error) {
        console.log('UserSaga', JSON.stringify(error));
        yield put({ type: ActionTypes.LOGIN_FAIL, error })
    }
}