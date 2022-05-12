import { put, takeLatest } from "redux-saga/effects";
import { LOGIN, LOGIN_SUCCESS, SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOGIN_FAIL, VIEW_HOMEPAGE, LOADING, VIEW_HOMEPAGE_SUCCESS, VIEW_HOMEPAGE_FAIL, CHANGE_PROFILE, CHANGE_PROFILE_SUCCESS, CHANGE_PROFILE_FAIL } from "./actions";
import axios from 'axios';
import URL from "./url";

function validate(payload) {
    const {name, username, password, age, phone, isSignUp, _id} = payload;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const body = {
                'name': name,
                'username': username,
                'password': password,
                '_id': _id,
                'age': age,
                'phone': phone,
                'isSignUp': isSignUp
            };

            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
            };
            
            axios.post(`${URL.baseURL}/api/users`, body, config)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        }, 1500);
    })
};

function* handleSignUp({payload}) {
    let temp = {};
    yield put({type: LOADING, payload: true});
    yield validate(payload)
        .then((res) => {
            temp = {...res};
            console.log(`${res.status} ${res.statusText}`);
            console.log(res.data);
            //put({type: SIGN_UP_SUCCESS, payload: {message: res.data.msg, isLoading: false, account: {username: payload.username, password: payload.password}, isSignUp: true}});
        })
        .catch((err) => {
            temp = {...err.response}
            console.log(err.response.data);
            //put({type: SIGN_UP_FAIL, payload: {message: err.response.data.msg, isLoading: false}})
        });
    if(temp.status == 200) yield put({type: SIGN_UP_SUCCESS, payload: {message: temp.data.msg, isLoading: false, account: {username: payload.username, password: payload.password}, isSignUp: true}}); 
    else if(temp.status == 400) yield put({type: SIGN_UP_FAIL, payload: {message: temp.data.msg, isLoading: false}});
};

function* handleLogin({payload}) {
    let temp = {};
    yield put({type: LOADING, payload: true});
    yield validate(payload)
        .then((res) => {
            temp = {...res};
            console.log(`${res.status} ${res.statusText}`);
            console.log(res.data);
            //put({type: LOGIN_SUCCESS, payload: {message: res.data.msg, isLoading: false}})
        })
        .catch((err) => {
            temp = {...err.response};
            console.log(err.response.data)
            //put({type: LOGIN_FAIL, payload: {message: err.response.data.msg, isLoading: false}})
        });
    if(temp.status == 200) yield put({type: LOGIN_SUCCESS, payload: {message: temp.data.msg, isLoading: false, account: {username: payload.username, password: payload.password}, isSignUp: true}}); 
    else if(temp.status == 400) yield put({type: LOGIN_FAIL, payload: {message: temp.data.msg, isLoading: false}});
};

function loading() {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            axios.get(`${URL.baseURL}/api/goods`)
                .then(res => resovle(res))
                .catch(err => reject(err))
        }, 1500);
    });
}

function *handleViewHomePage() {
    let temp = {};
    yield loading()
        .then(res => {
            temp = {...res};
            console.log(`${res.status} ${res.statusText}`);
            console.log(res.data);
        })
        .catch(err => {
            temp = {...err};
            console.log(temp.response);
            console.log(err.response.data)
        })
    if(temp.status == 200) yield put({type: VIEW_HOMEPAGE_SUCCESS, payload: {goods: temp.data, isLoading: false}});
    else if(temp.response.status == 400) yield put({type: VIEW_HOMEPAGE_FAIL, payload: {message: temp.response.msg, isLoading: false}});
}

function *handleChangeProfile({payload}) {
    let temp = {};
    yield put({type: LOADING, payload: true});
    yield validate(payload)
        .then(res => {
            temp = {...res};
            console.log(`${res.status} ${res.statusText}`);
            console.log(res.data);
            //put({type: CHANGE_PROFILE_SUCCESS, payload: {message: res.data.msg, isLoading: false}});
        })
        .catch(err => {
            temp = {...err};
            console.log(temp.response);
            console.log(err.response.data)
        })
    if(temp.status == 200) yield put({type: CHANGE_PROFILE_SUCCESS, payload: {message: temp.data.msg, isLoading: false, account: {username: payload.username, password: payload.password}}});
    else if(temp.response.status == 400) yield put({type: CHANGE_PROFILE_FAIL, payload: {message: temp.response.data.msg, isLoading: false}});
}

export default function* rootSaga() {
    yield takeLatest(SIGN_UP, handleSignUp);
    yield takeLatest(LOGIN, handleLogin);
    yield takeLatest(VIEW_HOMEPAGE, handleViewHomePage);
    yield takeLatest(CHANGE_PROFILE, handleChangeProfile);
};